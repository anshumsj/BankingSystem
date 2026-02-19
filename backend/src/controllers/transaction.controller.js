/**
 * # create a new transaction
 * 1. validate request
 * 2.validate indempotency key
 * 3.check account status
 * 4.derive sender balance from ledger
 * 5.create transaction(pending)
 * 6.create debit ledger entry
 * 7.create credit ledger entry
 * 8.mark transaction completed
 * 9.commit mongodb session
 * 10.send email notification to sender and receiver
 */
const transactionModel = require('../models/transaction.model');
const accountModel = require('../models/account.model');
const ledgerModel = require('../models/ledger.model');
const emailService = require('../services/nodemailer');
const { default: mongoose } = require('mongoose');
const { BsNewspaper } = require('react-icons/bs');

async function createTransactionController(req,res){
    const {toAccount,fromAccount,amount,indemPotencyKey}=req.body;
    if(!toAccount || !fromAccount || !amount || !indemPotencyKey){
        return res.status(400).json({
            message:"all fields are required"
        })
    }
    const existingTransaction = await transactionModel.findOne({indemPotencyKey});
    if(existingTransaction){
        if(existingTransaction.status === 'completed'){
            return res.status(200).json({
                message:"transaction already completed",
                transaction:existingTransaction
            })
        }
        if(existingTransaction.status === 'pending'){
            return res.status(200).json({
                message:"transaction is pending",
                transaction:existingTransaction
            })
        }
        if(existingTransaction.status === 'failed'){
            return res.status(200).json({
                message:"transaction already failed",
                transaction:existingTransaction
            })
        }
        if(existingTransaction.status === 'reversed'){
          return res.status(200).json({
              message:"transaction already reversed",
              transaction:existingTransaction
          })
      }
    }

    const senderAccount = await accountModel.findById(fromAccount);
    const receiverAccount = await accountModel.findById(toAccount);
    if(!senderAccount || !receiverAccount){
        return res.status(404).json({
            message:"sender or receiver account not found"
        })
    }
    if(senderAccount.status !== 'active' || receiverAccount.status !== 'active'){
        return res.status(400).json({
            message:"sender or receiver account is not active"
        })
    }
    const balance = await senderAccount.getBalance();
    if(balance < amount){
        return res.status(400).json({
            message:`insufficient balance . current balance is ${balance}`
        })
    }
    
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try{
        const transaction = await  transactionModel.create([{
            fromAccount,
            toAccount,
            amount,
            indemPotencyKey,
            status:'pending'
        }],{session})
        
        const debitLedgerEntry = await ledgerModel.create([{
            account:fromAccount,
            amount:amount,
            transaction:transaction[0]._id,
            type:"debit"
        }],{session})

        // Artificial delay to test idempotency key functionality by sending multiple requests 
        // with same idempotency key before the first transaction is completed
        await new Promise((resolve) => {
            setTimeout(resolve, 8000) // 5 seconds - increase/decrease as needed for testing
        })

        const creditLedgerEntry = await ledgerModel.create([{
            account:toAccount,
            amount:amount,
            transaction:transaction[0]._id,
            type:"credit"
        }],{session})
        
        await transactionModel.findByIdAndUpdate(transaction[0]._id,{status:'completed'},{session})  
        await session.commitTransaction();
        session.endSession();
        
        await emailService.TransactionEmail(req.user.name,req.user.email,amount,receiverAccount._id);
        
        return res.status(201).json({
            message:"transaction completed successfully",
            transaction:transaction[0]
        })
        
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            message:"transaction failed because a transaction with the same idempotency key is already in progress or completed, or due to insufficient balance",
            error:error.message
        })  
    }
  }

  async function initialFundsTransactionController(req,res){
      const {toAccount,amount,indemPotencyKey} = req.body;
      if(!toAccount || !amount || !indemPotencyKey){
          return res.status(400).json({
              message:"all fields are required"
          })
      }
      const existingTransaction = await transactionModel.findOne({indemPotencyKey});
       if(existingTransaction){
        if(existingTransaction.status === 'completed'){
            return res.status(200).json({
                message:"transaction already completed",
                transaction:existingTransaction
            })
        }
        if(existingTransaction.status === 'pending'){
            return res.status(200).json({
                message:"transaction is pending",
                transaction:existingTransaction
            })
        }
        if(existingTransaction.status === 'failed'){
            return res.status(200).json({
                message:"transaction already failed",
                transaction:existingTransaction
            })
        }
        if(existingTransaction.status === 'reversed'){
          return res.status(200).json({
              message:"transaction already reversed",
              transaction:existingTransaction
          })
      }
    }
      const receiverAccount = await accountModel.findById(toAccount);
      if(!receiverAccount){
          return res.status(404).json({
              message:"receiver account not found"
          })
      }
      if(receiverAccount.status !== 'active'){
          return res.status(400).json({
              message:"receiver account is not active"
          })
      }
      const senderAccount = await accountModel.findOne({systemUser:true}).select('+systemUser');
      if(!senderAccount){
          return res.status(404).json({
              message:"system account not found"
          })
      }
      const session = await mongoose.startSession();
    session.startTransaction();
    const transaction = await transactionModel.create([{
        fromAccount:senderAccount._id,
        toAccount,
        amount,
        indemPotencyKey,
        status:'pending'
    }],{session})
    const debitLedgerEntry = await ledgerModel.create([{
        account:senderAccount._id,
        amount:amount,
        transaction:transaction[0]._id,
        type:"debit"
    }],{session})
    const creditLedgerEntry = await ledgerModel.create([{
        account:toAccount,
        amount:amount,
        transaction:transaction[0]._id,
        type:"credit"
    }],{session})
    await transactionModel.findByIdAndUpdate(transaction[0]._id,{status:'completed'},{session})  
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({
        message:"initial funds transaction completed successfully",
        transaction:transaction[0]
    })
      
  }

  module.exports = {createTransactionController,initialFundsTransactionController}
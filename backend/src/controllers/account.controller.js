const accountModel = require('../models/account.model');

async function createAccountController(req,res){
    const userId = req.user._id;
    const account = await accountModel.create({
      user:userId
    })
    res.status(201).json({
        message:"account created successfully",
        account
    })
}

async function getAllAccountsController(req,res){
        const userID = req.user._id
        const accounts = await accountModel.find({user:userID})
        res.status(200).json({
            message:"accounts retrieved successfully",
            accounts
        })
}

async function getAccountBalanceController(req,res){
    const accountId = req.params.accountId;
    const account = await accountModel.findById(accountId);
    if(!account){
        return res.status(404).json({
            message:"account not found"
        })
    }
    if(account.user.toString() !== req.user._id.toString()){
        return res.status(403).json({
            message:"you are not authorized to view this account balance"
        })
    }
    const balance = await account.getBalance();
    res.status(200).json({
        message:"account balance retrieved successfully",
        balance
    })
}
module.exports = {createAccountController,getAllAccountsController,getAccountBalanceController}
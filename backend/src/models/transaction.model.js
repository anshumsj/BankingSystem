const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
        required:[true,'sender account is required'],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
        required:[true,'receiver account is required'],
        index:true
    },
    amount:{
        type:Number,
        required:[true,'amount is required'],
        min:[0.01,'amount must be at least 0.01']
    },
    status:{
        type:String,
        enum:{
            values:['pending','completed','failed','reversed'],
            message:'status must be either pending, completed, failed, or reversed'
        },
        default:'pending',
    },
    indemPotencyKey:{
        type:String,
        required:[true,'indemPotencyKey is required'],
        unique:true,
        index:true
    }
},{timestamps:true})

const transactionModel = mongoose.model('Transaction',transactionSchema);
module.exports = transactionModel;
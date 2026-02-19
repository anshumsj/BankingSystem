const mongoose = require('mongoose');
const { ImMug } = require('react-icons/im');

const ledgerSchema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Account',
        required:[true,'account is required'],
        index:true,
        Immutable:true
    },
    amount:{
        type:Number,
        required:[true,'amount is required'],
        min:[0.01,'amount must be at least 0.01'],
        Immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Transaction',
        required:[true,'transaction is required'],
        index:true,
        Immutable:true
    },
    type:{
        type:String,
        enum:{
            values:['debit','credit'],
            message:'type must be either debit or credit'
        },
        required:[true,'type is required'],
        Immutable:true
    }
})
// ledger entires can not be modfied or deleted once created, to ensure immutability and integrity of financial records
const  prevenLedgerModification = ()=>{
  throw new Error("Ledger modification is not allowed");
}

ledgerSchema.pre('findOneAndUpdate', prevenLedgerModification);
ledgerSchema.pre('updateOne', prevenLedgerModification);
ledgerSchema.pre('updateMany', prevenLedgerModification);
ledgerSchema.pre('deleteOne', prevenLedgerModification);
ledgerSchema.pre('deleteMany', prevenLedgerModification);
ledgerSchema.pre('remove', prevenLedgerModification);
ledgerSchema.pre('findOneAndDelete', prevenLedgerModification);
ledgerSchema.pre('findOneAndReplace', prevenLedgerModification);


const ledgerModel = mongoose.model('Ledger',ledgerSchema);
module.exports = ledgerModel;
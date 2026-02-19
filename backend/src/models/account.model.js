const mongoose = require('mongoose');
const ledgerModel = require('./ledger.model');
const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"user is required"],
        index:true
    },
    status:{
        type:String,
        enum:['active','frozen','closed'],
        default:'active'
    },
    currency:{
        type:String,
        required:[true,"currency is required"] ,
        default:'INR'
       },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},{timestamps:true})
// Compound index to ensure a user can have only one active account
accountSchema.index({user:1,status:1});

// function ot get account balance by summing up all related ledger entries, this is a virtual field and will not be stored in the database
accountSchema.methods.getBalance = async function(){
        const balanceData = await ledgerModel.aggregate([
            {$match:{account:this._id}},
            {
                $group:{
                    _id:null,
                    totalDebit:{
                        $sum:{
                            $cond:[
                                {$eq:["$type","debit"]},
                                "$amount",
                                0
                            ]
                        }
                    },
                    totalCredit:{
                        $sum:{
                            $cond:[
                                {$eq:["$type","credit"]},
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    balance:{$subtract:["$totalCredit","$totalDebit"]}
                }
            }
        ])
        if(balanceData.length === 0){
            return 0
        }
        return balanceData[0].balance
}
const accountModel = mongoose.model('Account',accountSchema);
module.exports = accountModel;
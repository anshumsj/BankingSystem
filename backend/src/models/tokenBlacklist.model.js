const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,'token is required'],
        unique:true,
    }},{timestamps:true})

tokenBlacklistSchema.index({createdAt: 1},{expireAfterSeconds: 60*60*24*3}) // tokens will be automatically removed after 1 hour (3600 seconds)
const tokenBlacklistModel = mongoose.model('TokenBlacklist',tokenBlacklistSchema);
module.exports = tokenBlacklistModel;
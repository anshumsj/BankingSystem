const tokenBlacklistModel = require('../models/tokenBlacklist.model')
const User = require('../models/user.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')

async function tokenVerification(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({
            message:"unauthorised:token not found"
        })
    }
    const isBlacklisted = await tokenBlacklistModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({
            message:"unauthorised:token is blacklisted"
        })
    }
    try{
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      req.user = user
      next()
    }catch(err){
        return res.status(401).json({       
            message:"invalid token"
        })
    }
}
async function systemUserVerification(req,res,next){
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message:"unauthorised:token not found"
            })
        }
        const isBlacklisted = await tokenBlacklistModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({
            message:"unauthorised:token is blacklisted"
        })
    }
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findOne({
                _id: decoded.id,
                systemUser: true
            })
            if(!user){
                return res.status(401).json({
                    message:"unauthorised:system system user not found"
                })
            }
            req.user = user;
            next()
        }catch(err){
            return res.status(401).json({
                message:"invalid system user token"
            })
        }
}

module.exports = {tokenVerification,systemUserVerification}
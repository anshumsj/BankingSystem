const tokenBlacklistModel = require('../models/tokenBlacklist.model');
const userSchema = require('../models/user.model');
const nodemailer = require('../services/nodemailer');
const jwt = require('jsonwebtoken');
async function register(req,res){
    const {email,password,name} = req.body;
    const existingUser = await userSchema.findOne({email});
    if(existingUser){
        return res.status(400).json({
            message:"email already exists"
        })
    }
    const user = new userSchema({email,password,name});
    await user.save();

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'10d'});
    res.cookie('token',token);
    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
    nodemailer.RegistrationEmail(name, email);
}

async function loginUser(req,res){
    const {email,password} = req.body;
    const user = await userSchema.findOne({email}).select('+password');
    if(!user){
      return res.status(400).json({
          message:"invalid email or password"
      })
    }
    const isMatch = await user.comparePassword(password,user.password);
    if(!isMatch){
          return res.status(400).json({
            message:"invalid email or password" 
      })
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'10d'});
    res.cookie('token',token);
    res.status(200).json({
        message:"user logged in successfully",
        user:{
            id:user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

async function logoutUser(req,res){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(400).json({
            message:"token not found"
        })
    }
    res.clearCookie('token');
    await tokenBlacklistModel.create({token});
    res.status(200).json({
        message:"user logged out successfully"
    })
}
module.exports = {register,loginUser,logoutUser}
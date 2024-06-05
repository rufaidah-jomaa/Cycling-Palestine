import userModel from '../../../DB/models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from  'jsonwebtoken'
import sendEmail from '../../services/sendEmail.js'
import {customAlphabet, nanoid} from 'nanoid'
import { AppError } from '../../services/AppError.js'


export const getauth=(req,res)=>{
    return res.json("hello from auth ")
}

export const signup= async(req,res,next)=>{
    const {userName,email,password}=req.body;

    const user= await userModel.findOne({email: email})
    if(user){
        return next( new AppError('email already exists',409))
    }
    const hashedPassword =  bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))

    const newUser = await userModel.create({userName,email,password:hashedPassword})
    if(!newUser){
        return next( new AppError('error while creating user',500))
    }

    const token =  jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60})
    const refreshToken = jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60*24*7})
    
       
     await sendEmail(email,"Cycling Palestine" ,userName,token,refreshToken)
    return res.status(201).json({message:"success",newUser})
}
export const confirmEmail= async(req,res)=>{
  const {token} = req.params;

   const decoded = jwt.verify(token, process.env.confirmEmailSIG);

if(!decoded){
    return next( new AppError('invalid token',401))
}
const user= await userModel.updateOne({email: decoded.email}, {confirmEmail: true});
if(user.modifiedCount>0){
    return res.redirect(process.env.FEURL)
}
return next( new AppError('Error while confirming your Email, please try again',500))
}

export const newconfirmEmail = async(req,res)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.confirmEmailSIG);
    if(!decoded){
        return next( new AppError('invalid token',401))
    }
    const user= await userModel.updateOne({email: decoded.email}, {confirmEmail: true});
    if(user.modifiedCount>0){
        return res.redirect(process.env.FEURL)
    }
    return next( new AppError('Error while confirming your Email, please try again',500))
}

export const signin= async(req,res,next)=>{
    const {email,password}=req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return next( new AppError('user not found',404))
    }
    if(!user.confirmEmail){
        return next( new AppError('please confirm your Email',403))

    }
    const match =  bcrypt.compareSync(password,user.password) 
    if(!match){
        return next( new AppError('password is not correct',401))

    }
    if (user.status == "Blocked"){
        return next( new AppError('Your account is blocked!',403))

       }
       const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG)
       return res.status(200).json({message:"success",token})
}

export const sendCode =async(req,res,next)=>{
       const {email}=req.body;
       const code = customAlphabet('1234567890abcdef', 6)()
       const user = await userModel.findOneAndUpdate({email},{sendCode:code},{new:true})
       if(!user){
        return next( new AppError('user not found',404))
       }
       await sendEmail(email,'RESET PASSWORD',`<h3>The Code is : ${code}</h3>`)
       return res.status(200).json({message:"success"}
       )
}

export const forgotPassword = async(req,res,next) =>{
    const {email,password,code}=req.body;
    const user=await userModel.findOne({email})
    if(!user){
        return next( new AppError('user not found',404))
    }
    if(user.sendCode != code){
        return next( new AppError('not matching code',400))
    }
    user.password= await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
    user.sendCode=null
    user.save()
    return res.status(200).json({message:"success",user})
}




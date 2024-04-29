import userModel from '../../../DB/models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from  'jsonwebtoken'
import sendEmail from '../../services/sendEmail.js'

export const getauth=(req,res)=>{
    return res.json("hello from auth ")
}

export const signup= async(req,res)=>{
    const {userName,email,password}=req.body;

    const user= await userModel.findOne({email: email})
    if(user){
        return res.json('email is already existing')
    }
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))

    const newUser = await userModel.create({userName,email,password:hashedPassword})
    if(!newUser){
        return res.json('error while creating user')
    }

    const token = await jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60})
    const refreshToken = jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60*24*7})
     const html = //بدها تزبيط
     `<div>
     <h2> Hello ${userName}</h2>
     <div> 
         <a href='http://localhost:3000/auth/confirmEmail/${token}'>confirm your email</a> 
        <a href='#'>resend confirm Email</a>  
     </div>
     </div>`;
     await sendEmail(email,"Welcome To Cycling Palestine " , html)
    return res.status(201).json({message:"success",newUser})
}
export const confirmEmail= async(req,res)=>{
const {token} = req.params;
const decoded = jwt.verify(token, process.env.confirmEmailSIG);
const user= await userModel.updateOne({email: decoded.email}, {confirmEmail: true});
if(user.modifiedCount>0){
    return res.redirect(process.env.FEURL) //مبدئيا حيحوله ع صفحة الفيسبوك لكن هون بنحط رابط الفرونت اند
}
return res.json("Error while confirming your Email, please try again")
}

export const login= async(req,res)=>{ //ضايل فاليديشن و قصة التوكن 
    const {email,password}=req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return res.json("user not found")
    }
    const match = await bcrypt.compare(password,user.password) 
    if(!match){
        return res.json("password in not correct")
    }
    const token = await jwt.sign({id:user._id},process.env.LOGINSIG)
    return res.json({message:"success",token})
}
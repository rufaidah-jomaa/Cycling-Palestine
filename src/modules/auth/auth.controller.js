import userModel from '../../../DB/models/User.model.js'
import bcrypt from 'bcryptjs'
import jwt from  'jsonwebtoken'
import sendEmail from '../../services/sendEmail.js'
import {customAlphabet, nanoid} from 'nanoid'

export const getauth=(req,res)=>{
    return res.json("hello from auth ")
}

export const signup= async(req,res)=>{
    const {userName,email,password}=req.body;

    const user= await userModel.findOne({email: email})
    if(user){
        return res.json('email is already existing')
    }
    const hashedPassword =  bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))

    const newUser = await userModel.create({userName,email,password:hashedPassword})
    if(!newUser){
        return res.json('error while creating user')
    }

    const token =  jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60})
    const refreshToken = jwt.sign({email},process.env.confirmEmailSIG,{expiresIn:60*60*24*7})
    const html =
    `<h2> Hello ${userName}</h2>
        <p> We wish you bicycle trips full of fun and benefit </p>
        <a href='${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>confirm your email</a> 
        <a href ='${req.protocol}://${req.headers.host}/auth/newconfirmEmail/${refreshToken}'>resend confirm Email</a> 
    `;
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

export const signin= async(req,res)=>{
    const {email,password}=req.body;

    const user = await userModel.findOne({email})
    if(!user){
        return res.json("user not found")
    }
    if(!user.confirmEmail){
        return res.json("please confirm your Email")
    }
    const match =  bcrypt.compareSync(password,user.password) 
    if(!match){
        return res.json("password in not correct")
    }
    if (user.status == "Blocked"){
        return res.status(403).json({message:"Your account is blocked!"})
       }
       const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG)
       return res.status(200).json({message:"success",token})
}

export const sendCode =async(req,res)=>{
       const {email}=req.body;
       const code = customAlphabet('1234567890abcdef', 6)()
       const user = await userModel.findOneAndUpdate({email},{sendCode:code},{new:true})
       if(!user){
        return res.status(404).json({message:"user not found"})
       }
       await sendEmail(email,'RESET PASSWORD',`<h3>The Code is : ${code}</h3>`)
       return res.status(200).json({message:"success"}
       )
}

export const forgotPassword = async(req,res) =>{
    const {email,password,code}=req.body;
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    if(!user.sendCode==code){
        return res.status(400).json({message:"not matcing code"})
    }
    user.password= await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
    user.sendCode=null
    user.save()
    return res.status(200).json({message:"success",user})
}

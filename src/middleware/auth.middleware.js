import jwt from 'jsonwebtoken'
import userModel from '../../DB/models/User.model.js';
export const roles ={
    Admin : 'Admin',
    User: 'User'
}

export const auth = ( accessRole = [])=>{  //لسا ما عملت كيف المستخدم يصير ادمن داينمك
    return async(req,res,next)=>{
    const {authorization}=req.headers;
    if(! authorization?.startsWith(process.env.BEARERKEY)){
        return res.json("invalid authorization")
    }
    const token = authorization.split(process.env.BEARERKEY)[1]
    const decoded = jwt.verify(token,process.env.LOGINSIG)
    if (!decoded){
        return res.status(400).json({message:"invalid token"})
    }
    
    const user = await userModel.findById(decoded.id).select('userName role birthdate email')
    if(!user){
        return  res.status(404).json({message:"user not found"})
    }
    if (!accessRole.includes(user.role)){
        return res.status(403).json({message:"you do not have a permession"})
    }
    req.user=user
    next();
  }
}
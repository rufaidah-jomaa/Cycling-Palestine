import jwt from 'jsonwebtoken'
import userModel from '../../DB/models/User.model.js';
import { AppError } from '../services/AppError.js';
export const roles ={
    Admin : 'Admin',
    User: 'User'
}

export const auth = ( accessRole = [])=>{  
    return async(req,res,next)=>{
    const {authorization}=req.headers;
    if(! authorization?.startsWith(process.env.BEARERKEY)){
        return next( new AppError('invalid authorization',401))
    }
    const token = authorization.split(process.env.BEARERKEY)[1]
    const decoded = jwt.verify(token,process.env.LOGINSIG)
    if (!decoded){
        return next( new AppError('invalid token',401))
    }
    
    const user = await userModel.findById(decoded.id).select('userName role birthdate email status image phone ')
    if(!user){
        return next( new AppError('user not found',404))
    }
    if (!accessRole.includes(user.role)){
        return next( new AppError('you do not have a permession',403))
    }
    req.user=user
    next();
  }
}

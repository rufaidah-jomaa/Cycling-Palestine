import couponModel from "../../../DB/models/Coupon.model.js"
import { AppError } from "../../services/AppError.js"

export const create = async(req,res,next)=>{
    if(await couponModel.findOne({code:req.body.code})){
        return next(new AppError('name already exists',409))
    }
    req.body.expiredDate= new Date(req.body.expiredDate)
    const coupon=await couponModel.create(req.body)
    return res.status(201).json({message:"coupon created successfully",coupon})
}

export const getAll=async(req,res,next)=>{
     const coupons=await couponModel.find()
     return res.status(200).json({message:"success",coupons})
}
export const update= async(req,res)=>{
    const coupon=await couponModel.findById(req.params.id)
    if(!coupon){
        return next(new AppError('coupon not found',404))

    }
    coupon.code=req.body.code;
    if (await couponModel.findOne({code:req.body.code , _id:{$ne:req.params.id}})){
        return next(new AppError('This code already exists',409))

       }
       coupon.expiredDate=req.body.expiredDate
       coupon.discountPercentage=req.body.discountPercentage
       coupon.save();
    return res.status(200).json({message:"coupon updated successfully",coupon})
}

export const destroy =async(req,res)=>{
    const coupon=await couponModel.findByIdAndDelete(req.params.id)
    return res.status(200).json({message:"coupon deleted successfully",coupon})
}
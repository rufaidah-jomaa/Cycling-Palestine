import couponModel from "../../../DB/models/Coupon.model.js"

export const create = async(req,res)=>{
    if(await couponModel.findOne({code:req.body.code})){
        return res.status(409).json({message:"name already exists"})
    }
    req.body.expiredDate= new Date(req.body.expiredDate)
    const coupon=await couponModel.create(req.body)
    return res.status(201).json({message:"coupon created successfully",coupon})
}

export const getAll=async(req,res)=>{
     const coupons=await couponModel.find()
     return res.status(200).json({message:"success",coupons})
}
export const update= async(req,res)=>{
    const coupon=await couponModel.findById(req.params.id)
    if(!coupon){
        return res.status(404).json({message:"coupon not found"})
    }
    coupon.code=req.body.code;
    if (await couponModel.findOne({code:req.body.code , _id:{$ne:req.params.id}})){
        return res.status(409).json("This code already exists")
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
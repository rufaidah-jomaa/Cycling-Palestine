import couponModel from "../../../DB/models/Coupon.model.js"

export const create = async(req,res)=>{
    if(await couponModel.findOne({code:req.body.code})){
        return res.status(409).json({message:"name already exists"})
    }
    req.body.expiredDate= new Date(req.body.expiredDate)
    const coupon=await couponModel.create(req.body)
    return res.status(201).json({message:"coupon created successfully",coupon})
}
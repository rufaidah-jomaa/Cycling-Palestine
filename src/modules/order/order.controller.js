import cartModel from "../../../DB/models/Cart.model.js"
import couponModel from "../../../DB/models/Coupon.model.js"

export const getOrderTest=(req,res)=>{
    return res.json("hello from order")
}

export const create=async(req,res)=>{
    const cart = await cartModel.findOne({userId:req.user._id})
    if(!cart){
        return res.json({message:"cart is empty!"})
    }

    if(req.body.couponId){
        const coupon = await couponModel.findById(req.body.couponId)
        if(!coupon){
            return res.status(404).json({message:"coupon not found!"})
        }
        if(coupon.expiredDate < new Date()){
            return res.status(404).json({message:"coupon expired!"})
        }
       if(coupon.usedBy.includes(req.user._id)){
        return res.status(409).json({message:"coupon already used"})
       }
       req.body.coupon=coupon;
    }
    return res.json(cart)
}
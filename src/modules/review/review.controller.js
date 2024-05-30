import orderModel from "../../../DB/models/Order.model.js";
import reviewModel from "../../../DB/models/review.model.js";

export const create= async(req,res)=>{
    const {productId}=req.params;
    const{comment,rating}=req.body;
  
    const order = await orderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        "products.productId":productId
    })
    if(!order){
        return res.status(400).json({message:"can't review this product"})
    }
    const checkReviw= await reviewModel.findOne({
        userId:req.user._id,
        productId:productId
    })
    if(checkReviw){
        return res.status(409).json({message:"already reviewed this product"})
    }
    const review = await reviewModel.create({
        userId:req.user._id,
        productId:productId,
        comment:comment,
        rating:rating
    })
    return res.status(201).json({message:"success",review})
}

export const update=async(req,res)=>{
    const {reviewId}=req.params;
    const review = await reviewModel.findOne({_id:reviewId},{userId:req.user._id})
    if(!review){
        return res.status(404).json({message:"review not found"})
    }
    review.comment=req.body.comment
    review.rating=req.body.rating
    await review.save()
    return res.status(200).json({message:"success",review})
}

export const destroy= async(req,res)=>{
    const {reviewId}=req.params;
    const review = await reviewModel.findOneAndDelete({_id:reviewId},{userId:req.user._id})
    if(!review){
        return res.status(400).json({message:'review has not deleted'})
    }
    return res.status(200).json({message:'success',review})
}
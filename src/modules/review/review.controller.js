import orderModel from "../../../DB/models/Order.model.js";
import reviewModel from "../../../DB/models/review.model.js";
import { AppError } from "../../services/AppError.js";


export const create= async(req,res,next)=>{
    const {productId}=req.params;
    const{comment,rating}=req.body;
  
    const order = await orderModel.findOne({
        userId:req.user._id,
        status:'delivered',
        "products.productId":productId
    })
    if(!order){
        return next(new AppError("can't review this product",400))
    }
    const checkReviw= await reviewModel.findOne({
        userId:req.user._id,
        productId:productId
    })
    if(checkReviw){
        return next(new AppError("already reviewed this product",409))

    }
    const review = await reviewModel.create({
        userId:req.user._id,
        productId:productId,
        comment:comment,
        rating:rating
    })
    return res.status(201).json({message:"success",review})
}

export const update=async(req,res,next)=>{
    const {reviewId}=req.params;
    const review = await reviewModel.findOne({_id:reviewId},{userId:req.user._id})
    if(!review){
        return next(new AppError("review not found",404))

    }
    review.comment=req.body.comment
    review.rating=req.body.rating
    await review.save()
    return res.status(200).json({message:"success",review})
}

export const destroy= async(req,res,next)=>{
    const {reviewId}=req.params;
    const review = await reviewModel.findOneAndDelete({_id:reviewId},{userId:req.user._id})
    if(!review){
        return next(new AppError("review has not deleted",400))
    }
    return res.status(200).json({message:'success',review})
}

export const get= async(req,res,next)=>{
    const {productId}=req.params
    
    const reviews= await reviewModel.find({ productId:productId})
    return res.status(200).json({message:"success",reviews})
}
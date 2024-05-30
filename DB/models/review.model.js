import mongoose, { Schema, Types, model } from "mongoose";
const reviewSchema = new Schema({
    comment:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        require:true
    },
    productId:{
        type:Types.ObjectId,
        ref:'Product',
        require:true
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        require:true
    },
})
const reviewModel = model('Review',reviewSchema)
export default reviewModel;
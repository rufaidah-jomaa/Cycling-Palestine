
import mongoose, { Schema, Types, model } from 'mongoose'

const productSchema = new Schema ({
    name:{
        type:String,
        unique:true,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    finalPrice:{ //after discount
        type: Number,
    },
    mainImage:{
        type: Object,
        required:true
    },
    subImages:[{ //array of objects
        type:Object,
    }],
    status:{
        type:String,
        default:'Active',
        enum:['Active','inActive']
    },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    },
    createdBy:{
      type:Types.ObjectId,
      ref:"User",
      required:true
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true
      },
},
{
    timestamps:true
})
const productModel= model('Product',productSchema)
export default productModel;
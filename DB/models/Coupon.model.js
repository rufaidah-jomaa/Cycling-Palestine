import mongoose, { Schema, Types, model } from 'mongoose';

const couponSchema = new Schema({
  code:{
    type:String,
    required:true,
    unique:true
  },
  discountPercentage:{
    type:Number,
    required:true
  },
  usedBy:[{
   type:Types.ObjectId,
   ref:'User',
   required:true
}],
  expiredDate:{
    type:Date,
    required:true
  }
},
{
timestamps:true,
})

const couponModel = model('Coupon',couponSchema);
export default couponModel;

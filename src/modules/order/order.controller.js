import cartModel from "../../../DB/models/Cart.model.js"
import couponModel from "../../../DB/models/Coupon.model.js"
import orderModel from "../../../DB/models/Order.model.js"
import productModel from "../../../DB/models/Product.model.js"
import userModel from "../../../DB/models/User.model.js"
import { AppError } from "../../services/AppError.js"
import createInvoice from "../../services/pdf.js"

import sendEmail from "../../services/sendEmail.js"

export const getOrderTest=(req,res)=>{
    return res.json("hello from order")
}

export const create=async(req,res,next)=>{
    //return res.json(req.user._id)
    const {couponCode}=req.body;
    const cart = await cartModel.findOne({userId:req.user._id})
    if(!cart || cart.products.length == 0){
        return next(new AppError('cart is empty!'),403)
    }
    
    req.body.products=cart.products // add to req.body the products 
    
    if(req.body.couponCode){
        const coupon = await couponModel.findOne({code:couponCode})
        if(!coupon){
            return next(new AppError('coupon not found!'),404)

        }
        if(coupon.expiredDate < new Date()){
            return next(new AppError('coupon expired!'),404)
        }
    
       if(coupon.usedBy.includes(req.user._id)){
        return next(new AppError('coupon already used'),409)
       }
       req.body.coupon=coupon;
    }
    if(req.body.coupon){
        await couponModel.findOneAndUpdate({_id:req.body.coupon._id},
            {$addToSet:{usedBy:req.user._id}}
        )
     }
 let finalProductsList=[]
 let totalPrice=0
 for (let product of req.body.products){
  const checkProduct = await productModel.findOne({
    _id:product.productId,
    stock:{$gte:product.quantity}
  })
    if(!checkProduct){
        return next(new AppError('product quantity not available'),403)
    }
    product = product.toObject()
    product.productName=checkProduct.name //المعلومات تخزن جوا الداتابيس في المونجوز على شكل(Bson) .. Binary Json 
    product.unitPrice=checkProduct.price
    product.discount=checkProduct.discount
    product.finalPrice=product.quantity*checkProduct.finalPrice
    totalPrice+=product.finalPrice
    finalProductsList.push(product)
 }

 const user= await userModel.findById(req.user._id)
 if(!req.body.address){
    req.body.address=user.Address
 }
 if(!req.body.phone){
    req.body.phone = user.phone
 }

 const order = await orderModel.create({
    userId:req.user._id,
    products:finalProductsList,
    amount:totalPrice - (totalPrice*(req.body.coupon?.discountPercentage || 0)/100),
    address:req.body.address,
    phoneNumber:req.body.phone,
    updatedBy:req.user._id
 })
 if (order) {
 
    const invoice = {
      shipping: {
        name: user.userName,
        address: order.address,
        phone:order.phoneNumber
      },
      items: order.products,
      subtotal: order.amount,
      paid: 0,
      invoice_nr: 1234,
    };
    
    const file="invoice.pdf"
  createInvoice(invoice,file);
  const x=''
   // sendEmail(user.email,"Purchase Invoice ",user.userName,x,"Invoice",true)

    for (const product of req.body.products) {
        await productModel.findOneAndUpdate({_id:product.productId},
            {$inc:{
                stock:-product.quantity
            }}
        )
    }
 }

 await cartModel.findOneAndUpdate({userId:req.user._id},
    {products:[]}
 )
 
    return res.json({message:'success',order})
}

export const getOrders=async(req,res)=>{
    const orders = await orderModel.find({
     /* $or:[{
            status:'pending'
        },
        {
            status:'confirmed'
        }],*/
     }).populate([
        {
        path:'userId',
        select:' userName email',
     }
    ])
    return res.status(200).json({message:'success',orders})
}

export const getMyOrders= async(req,res)=>{
    const orders = await orderModel.find({userId:req.user._id})
    return res.status(200).json({message:'success',orders})
}

export const changeStatus = async(req,res,next)=>{
    const {orderId}=req.params;
    const {status}=req.body;

    const order= await orderModel.findById(orderId)
    if(!order){
        return next(new AppError("order not found",404))
    }
    order.status=status;
    order.save();
    return res.status(200).json({message:'success',order})
}
import cartModel from "../../../DB/models/Cart.model.js"
import productModel from "../../../DB/models/Product.model.js"
import { AppError } from "../../services/AppError.js"

export const getProductsFromCart=async(req,res,next)=>{
    const cart = await cartModel.findOne({userId:req.user._id})
    if(!cart || cart.products.length == 0){
        return next(new AppError('cart is empty',403))
    }
    let products = cart.products
    const finalProductsList=[]
    let totalPrice=0
    for (let product of products){
        const checkProduct = await productModel.findOne({
          _id:product.productId,
          stock:{$gte:product.quantity}
        })
          if(!checkProduct){
              return next(new AppError('product not found'),404)
          }
          product = product.toObject()
          product.name=checkProduct.name //المعلومات تخزن جوا الداتابيس في المونجوز على شكل(Bson) .. Binary Json 
          product.mainImage=checkProduct.mainImage
          product.stock=checkProduct.stock
          product.finalPrice = product.quantity * checkProduct.finalPrice
          totalPrice += product.finalPrice
          finalProductsList.push(product)
       }
    const numberOfProducts = finalProductsList.length;
    return res.json({message:"success",numberOfProducts,finalProductsList,totalPrice})
}
export const create=async(req,res,next)=>{
    if(req.user.status =='Blocked'){
        return next(new AppError('You are blocked.. you cant add products to cart',403))
    }
    const {productId} = req.body
    const product = await productModel.findOne({_id:productId,stock:{$gte:1}})
    if(!product){
        return next(new AppError('product not found',404))
    }
   
    const cart = await cartModel.findOne({userId:req.user._id})
    if(!cart){
       
        const newCart = await cartModel.create({
            userId:req.user._id,
            products:{productId}
        })
        return res.json({message:"success",newCart})
    }
    for(let i = 0;i<cart.products.length;i++){
        if(cart.products[i].productId == productId){
         return next(new AppError('product already exists',401))
        }
    }
    cart.products.push({productId:productId})
    await cart.save();
    return res.json({message:"product added to cart",cart})
}

export const remove=async(req,res)=>{
    const {productId}=req.params;
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id},
        {
            $pull:{
                products:{
                    productId:productId
                }
            }
        },
        {new:true}
    )
    return res.json({message:"product removed",cart})
}

export const clear=async(req,res)=>{
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id},{
        products:[],
    },{new:true})
    return res.json({message:"cart cleared",cart})
   
}

export const updateQuantity=async(req,res)=>{
    const {quantity,operatorQ}=req.body;
    const inc = (operatorQ === "+")?quantity:-quantity;
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id, "products.productId":req.params.productId},
    {
        $inc:{
            "products.$.quantity":inc
        }
    },{new:true})
     return res.json({message:"success",cart})

}
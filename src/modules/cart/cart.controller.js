import cartModel from "../../../DB/models/Cart.model.js"
import { AppError } from "../../services/AppError.js"

export const test=(req,res)=>{
    return res.json("Cart")
}
export const create=async(req,res,next)=>{
    if(req.user.status =='Blocked'){
        return next(new AppError('You are blocked.. you cant add products to cart',403))
    }
    const {productId} = req.body
   
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
    const {quantity,operator}=req.body;
    const inc = (operator=="+")?quantity:-quantity;
    const cart = await cartModel.findOneAndUpdate({userId:req.user._id, "products.productId":req.params.productId},
    {
        $inc:{
            "products.$.quantity":inc
        }
    },{new:true})
     return res.json({message:"success",cart})

}
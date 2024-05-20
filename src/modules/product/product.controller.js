import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import cloudinary from "../../services/cloudinary.js";
import productModel from "../../../DB/models/Product.model.js";

export const test=(req,res)=>{
    return res.json('product')
}

export const creatProduct = async(req,res)=>{
    const {name,price,discount,categoryId}=req.body;

    const checkCategory= await categoryModel.findById(categoryId)
    if(!checkCategory){
        return res.status(404).json({message:"Category Not Found!"})
    }

    req.body.slug=slugify(name)

    req.body.finalPrice = price - ((price * (discount || 0) ) / 100 )

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
        {folder:`${process.env.App_Name}/product/${name}`})
    req.body.mainImage= {secure_url,public_id} 

    req.body.subImages=[]
    for (const file of req.files.subImages) { // file: iteration
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
            {folder:`${process.env.App_Name}/product/${name}/subImages`})
            req.body.subImages.push({secure_url,public_id})
    }

    req.body.createdBy=req.user._id
    req.body.updatedBy=req.user._id
    const product= await productModel.create(req.body)
    const notification = await notificModel.create({content:"قام المسؤول باضافة منتج جديد يمكنك شراءه الان!"})

    return res.status(201).json({message:"product added successfully!",product})
}

export const getAll = async(req,res)=>{
    const {id} = req.params;//categoryId
    const checkcategory=await categoryModel.findById({_id:id})
    if(!checkcategory){
        return res.status(404).json({message:"category not found!"})
    }
    const products = await productModel.find({categoryId:id}).select('name price')
    return res.status(200).json({message:"success",products})
}

export const getActive= async (req,res)=>{
    const {id} = req.params;//categoryId
    const checkcategory=await categoryModel.findById({_id:id})
    if(!checkcategory){
        return res.status(404).json({message:"category not found!"})
    }
    const products = await productModel.find({categoryId:id,status:'Active'})
    return res.status(200).json({message:"success",products})
}

export const getDetails = async (req,res)=>{
    const product = await productModel.findById(req.params.id) //productId
    if(!product){
        return res.json({message:"product not found"})
    }
    return res.status(200).json({message:"success",product})
}

export const update = async(req,res)=>{
    //return res.json(typeof(parseInt(req.body.price)))
    const product = await productModel.findById(req.params.id)//productId
    if(! product){
     return res.status(404).json("product not found")
    }
   
   product.name = req.body.name.toLowerCase();
    if (await productModel.findOne({name:product.name , _id:{$ne:req.params.id}})){
     return res.status(409).json("This name already exists")
    }
 product.slug =slugify(req.body.name.toLowerCase())
 product.status = req.body.status
 product.price = (parseInt(req.body.price))
 product.finalPrice=(parseInt(req.body.price)) - ((product.price * (product.discount || 0) ) / 100 )
 product.updatedBy=req.user._id
 if(req.files.mainImage){
    //return res.json(req.files.mainImage[0])
     const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,
         {folder:`${process.env.App_Name}/product/${req.body.name}`})
     await cloudinary.uploader.destroy(product.mainImage.public_id)
     product.mainImage = {secure_url,public_id}
 }
 req.body.subImages=[]
 if(req.files.subImages){
    
    async function deleteSub () {
        for (const element of product.subImages) {
            await cloudinary.uploader.destroy(element.public_id)    
        }
      }
      deleteSub()
   for (const file of req.files.subImages) { // file: iteration   
     const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
            {folder:`${process.env.App_Name}/product/${req.body.name}/subImages`})
            req.body.subImages.push({secure_url,public_id})
    }
   }
   product.save()
    return res.json({message:"success",product})
}

export const destroy = async(req,res)=>{
    const product = await productModel.findByIdAndDelete(req.params.id)//productId
    if(!product){
        return res.status(404).json({message:"Product Not Found!"})
    }
      await cloudinary.uploader.destroy(product.mainImage.public_id)
     async function deleteSub () {
        for (const element of product.subImages) {
            await cloudinary.uploader.destroy(element.public_id)    
        }
      }
      deleteSub()
    return res.json({message:"category successfully deleted",product})
}

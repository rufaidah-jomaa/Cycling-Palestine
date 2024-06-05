import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import cloudinary from "../../services/cloudinary.js";
import productModel from "../../../DB/models/Product.model.js";
import notificModel from "../../../DB/models/Notifications.model.js";
import { pagination } from "../../services/pagination.js";
import { AppError } from "../../services/AppError.js";

export const test=(req,res)=>{
    return res.json('product')
}

export const creatProduct = async(req,res,next)=>{
    const {name,price,discount,categoryId}=req.body;

    const checkCategory= await categoryModel.findById(categoryId)
    if(!checkCategory){
        return next(new AppError("Category Not Found!",404))
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

export const getAll = async(req,res,next)=>{
    const {skip,limit}= pagination(req.query.page,req.query.limit)
    const {id} = req.params;//categoryId
    const checkcategory=await categoryModel.findById({_id:id})
    if(!checkcategory){
        return next(new AppError("category not found!!",404))

    }
    const products = await productModel.find({categoryId:id}).select('name price').skip(skip).limit(limit)
    return res.status(200).json({message:"success",products})
}

export const getActive= async (req,res,next)=>{
  
   const {skip,limit}= pagination(req.query.page,req.query.limit)
    let queryObj = {...req.query}
    const execQuery = ['page','limit','sort','search'] 
    execQuery.map((ele)=>{
        delete queryObj[ele]
    })
   
    queryObj= JSON.stringify(queryObj)
    queryObj=queryObj.replace(/gt|gte|lt|lte|in|nin|eq/g,match=>`$${match}`)
    queryObj=JSON.parse(queryObj)
    
    //const {id} = queryObj.categoryId;//categoryId

   
    const checkcategory=await categoryModel.findById(queryObj.categoryId)
    if(!checkcategory){
        return next(new AppError("category not found!",404))
    }
  //return res.json(id)
    const mongooseQuery =  productModel.find(queryObj).skip(skip).limit(limit).select('name price status')
    if(req.query.search){
    mongooseQuery.find({
        $or:[
       { name:{$regex:req.query.search}},
       {description:{$regex:req.query.search}}
        ]
    })
}
    const products= await mongooseQuery.sort(req.query.sort);
    return res.status(200).json({message:"success",products})
}

export const getDetails = async (req,res,next)=>{
    const product = await productModel.findById(req.params.id).populate({
        path:'reviews',
        populate:{ //Populateبعملها كمان..populate النتيجة اللي جاي من اول 
            path:'userId',
            select:'userName'
        }
    }) //productId
    if(!product){
        return next(new AppError("product not found",404))

    }
    return res.status(200).json({message:"success",product})
}

export const update = async(req,res,next)=>{
    //return res.json(typeof(parseInt(req.body.price)))
    const product = await productModel.findById(req.params.id)//productId
    if(! product){
     return next(new AppError("product not found",404))
    }
   
   product.name = req.body.name.toLowerCase();
    if (await productModel.findOne({name:product.name , _id:{$ne:req.params.id}})){
        return next(new AppError("This name already exists",409))
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
      product.subImages=[]
   for (const file of req.files.subImages) { // file: iteration   
     const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
            {folder:`${process.env.App_Name}/product/${req.body.name}/subImages`})
            req.body.subImages.push({secure_url,public_id})
    }
    product.subImages=req.body.subImages
   }
   product.save()
    return res.json({message:"success",product})
}

export const destroy = async(req,res,next)=>{
    const product = await productModel.findByIdAndDelete(req.params.id)//productId
    if(!product){
        return next (new AppError("Product Not Found!",404))
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

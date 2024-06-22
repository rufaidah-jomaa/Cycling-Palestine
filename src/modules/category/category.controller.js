import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import cloudinary from "../../services/cloudinary.js";
import { AppError } from "../../services/AppError.js";

export const testCategory = (req,res)=>{
    return res.json("Category")
}

export const createCategory = async(req,res,next)=>{
    const name =req.body.name.toLowerCase();
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path ,
         {folder:`${process.env.App_Name}/categories`})
    if( await categoryModel.findOne({name})){
        return next(new AppError('Category already exists',409))
    }
    const category = await categoryModel.create({name,image:{secure_url,public_id},slug:slugify(name),
                        createdBy:req.user._id,updatedBy:req.user._id})
    return res.status(200).json({message:"success",category})
}

export const getAll = async(req,res,next)=>{
    const categories = await categoryModel.find({}).select('name image status createdAt')
    return res.status(200).json({message:"success",categories})
}

export const getActive= async (req,res,next)=>{
    const categories = await categoryModel.find({status:'Active'})
    return res.status(200).json({message:"success",categories})
}

export const getDetails = async (req,res,next)=>{
    const category = await categoryModel.findById(req.params.id)
    if(!category){
        return next(new AppError('category not found',409))

    }
    return res.status(200).json({message:"success",category})
}

export const update = async(req,res,next)=>{
   const category = await categoryModel.findById(req.params.id)
   if(! category){
    return next(new AppError('category not found',404))

   }
  category.name=req.body.name.toLowerCase();
   if (await categoryModel.findOne({name:category.name , _id:{$ne:req.params.id}})){
    return next(new AppError('This name already exists',409))

   }
category.slug =slugify(req.body.name.toLowerCase())
category.status = req.body.status
category.updatedBy=req.user._id
if(req.file){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
        {folder:`${process.env.App_Name}/categories`})
    await cloudinary.uploader.destroy(category.image.public_id)
    category.image = {secure_url,public_id}
}
  category.save()
   return res.json({message:"success",category})
}

export const destroy = async(req,res,next)=>{
    const category = await categoryModel.findByIdAndDelete(req.params.id)
    if(!category){
        return next(new AppError('Category Not Found!',404))

    }
    await cloudinary.uploader.destroy(category.image.public_id)
    return res.json({message:"category successfully deleted",category})
}
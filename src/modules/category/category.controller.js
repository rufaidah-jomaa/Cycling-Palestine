import slugify from "slugify";
import categoryModel from "../../../DB/models/Category.model.js";
import cloudinary from "../../services/cloudinary.js";

export const testCategory = (req,res)=>{
    return res.json("Category")
}

export const createCategory = async(req,res)=>{
    const {name}=req.body;
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path ,
         {folder:`${process.env.App_Name}/catigories`})
    if( await categoryModel.findOne({name})){
        return res.status(409).json("Category already exists")
    }
    const category = await categoryModel.create({name,image:{secure_url,public_id},slug:slugify(name)})
    return res.status(200).json({message:"success",category})
}
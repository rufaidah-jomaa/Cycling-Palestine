import userModel from "../../../DB/models/User.model.js"
import cloudinary from "../../services/cloudinary.js"

export const getuser=(req,res)=>{
    res.json("hello from user")
}

export const getProfile= async(req,res,next)=>{
    const user= await userModel.findById(req.user._id)
    return res.json({message:"success",user})
}

export const uploadPic= async(req,res,next)=>{
    const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder: `${process.env.App_Name}/users`})
    const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:secure_url},{new:true} )
    return res.json({message:"success",user})
}
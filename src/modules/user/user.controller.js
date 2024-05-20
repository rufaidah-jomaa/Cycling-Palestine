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

export const updateProfile=async(req,res)=>{
    const user = await userModel.findById(req.params.id)
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    user.userName=req.body.userName
    user.gender=req.body.gender
    user.birthdate=req.body.birthdate
    user.phone=req.body.phone
    user.Address=req.body.Address
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,
            {folder: `${process.env.App_Name}/users`})
            if(user.image.public_id){
           await cloudinary.uploader.destroy(user.image.public_id)
            }
            user.image = {secure_url,public_id}

    }
    await user.save()
    return res.json({message:"success",user})
}
export const deleteAccount= async(req,res)=>{
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    return res.json({message:"success",deletedUser:user})
}

export const blockUser = async(req,res)=>{

    const user = await userModel.findOneAndUpdate({_id:req.params.id},
        {
            status:'Blocked'
        },
        {new:true}
    )
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    return res.json({message:"success",user})
    }

    export const unBlockUser=async(req,res)=>{
        const user = await userModel.findOneAndUpdate({_id:req.params.id},
            {
                status:'Active'
            },
            {new:true}
        )
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.json({message:"success",user})
        
    }
    export const addAdmin=async(req,res)=>{
        const user = await userModel.findOneAndUpdate({_id:req.params.id},
            {
                role:'Admin'
            },
            {new:true}
        )
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.json({message:"success",user})
    }

    export const removeAdmin=async(req,res)=>{
        const user = await userModel.findOneAndUpdate({_id:req.params.id},
            {
                role:'User'
            },
            {new:true}
        )
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        return res.json({message:"success",user})
    }



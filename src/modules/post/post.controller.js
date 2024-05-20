import commentModel from "../../../DB/models/Comment.model.js";
import postModel from "../../../DB/models/Post.model.js";
import cloudinary from "../../services/cloudinary.js";

export const getPosts=async(req,res,next)=>{
     const posts=await postModel.find({}).populate([
         {
            path:'user_id',
            select:'userName'
         },
         {
            path:'like',
            select:'userName'
         },
         {
            path: 'comments',
            select:'text userName'
         }
     ])
     return res.json({message:"success",posts})
}

export const createPost= async(req,res,next)=>{
    const {title,body}=req.body;
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path, {folder: `${process.env.App_Name}/post`});
    const post = await postModel.create({title,body,image:{secure_url,public_id},user_id:req.user._id})
    if(!post){
        return next(new Error("Couldn't create post"))
    }
    const notification = await notificModel.create({content:"قام المسؤول باضافة منشور جديد يمكنك التفاعل معه الان!"})

    return res.json({message:"success",post})
}

export const likePost = async (req,res,next)=>{
    const user_id=req.user._id;
    const {id}=req.params; //postID
    const like = await postModel.findByIdAndUpdate({_id:id},
        {
            $addToSet:{
                like:user_id
            }
        },
        {new:true}
    )
    if(!like){
        return  next(new Error('Error in liking the Post'))
    }
    return res.json({message:"success",like})
}

export const createComment = async(req,res,next)=>{
    req.body.userName=req.user.userName
    req.body.user_id=req.user._id;
    req.body.post_id=req.params.id
    if(req.file){
       const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
        {folder:`${process.env.App_Name}/comments/${req.body.post_id}`})
        req.body.image = {secure_url,public_id}
    }
    const comment = await commentModel.create(req.body)
    return res.json({message:"success",comment})
}

export const updatePost=async(req,res)=>{
    const post = await postModel.findById(req.params.id)
    if(!post){
        return res.status(404).json({message:"success"})
    }
    post.title=req.body.title;
    post.body=req.body.body;
    if(req.body.file){
        //بدها تكملة
    }
    post.save();
    return res.status(201).json({message:"success",post})
}
export const deletePost=async(req,res)=>{
    const deletedPost=await postModel.findByIdAndDelete(req.params.id)
    if(!deleteTrack){
        return res.status(404).json({message:"post not found"})
    }
    return res.status(201).json({message:"success",deletedPost})
}
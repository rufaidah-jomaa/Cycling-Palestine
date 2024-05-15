import commentModel from "../../../DB/models/Comment.model.js";
import trackModel from "../../../DB/models/Track.model.js";
import cloudinary from "../../services/cloudinary.js";


export const addTrack= async(req,res,next)=>{
    const{trackName,date,distance,start_point,end_point,difficulty_level,description}=req.body;
    const track = await trackModel.create({trackName,date,distance,start_point,end_point,difficulty_level,description})
    if(!track){
        return next(new Error("Track not created"))
    }
    return res.json({message:"success",track})
}

export const getTracks= async (req,res,next)=>{
    const tracks = await trackModel.find({}).populate({
        path:'participants',
        select:'name'
    })
    return res.json({message:"success",tracks})
}

export const getDetails = async (req,res)=>{
    const track = await trackModel.findById(req.params.id).populate([
         {
            path:'like',
            select:'userName'
         },
         {
            path: 'comments',
            select:'text userName',
            
         },
         {
            path:'participants',
            select:'name'
         }
    ])
    if(!track){
        return res.json({message:"track not found"})
    }
    return res.status(200).json({message:"success",track})
}

export const getByDate = async(req,res,next)=>{
    const {date}=req.query;
    const tracks= await trackModel.find({
        'date':  { $gt: date },
    })
    return res.json({message:"success",tracks})
}
export const getByName = async(req,res,next)=>{
    const {name}=req.params;
   
    const tracks= await trackModel.find({
        trackName: name,
    })
    return res.json({message:"success",tracks})
}

export const likeTrack = async (req,res,next)=>{
    const user_id=req.user._id;
    const {id}=req.params; //trackID
    const like = await trackModel.findByIdAndUpdate({_id:id},
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

     req.body.userName = req.user.userName
    req.body.user_id=req.user._id;
    req.body.track_id=req.params.id
    if(req.file){
       const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,
        {folder:`${process.env.App_Name}/comments/${req.body.track_id}`})
        req.body.image = {secure_url,public_id}
    }
    const comment = await commentModel.create(req.body)
    return res.json({message:"success",comment})
}
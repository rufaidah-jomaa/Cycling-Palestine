import commentModel from "../../../DB/models/Comment.model.js";
import notificModel from "../../../DB/models/Notifications.model.js";
import trackModel from "../../../DB/models/Track.model.js";
import { AppError } from "../../services/AppError.js";
import cloudinary from "../../services/cloudinary.js";
import { pagination } from "../../services/pagination.js";


export const addTrack= async(req,res,next)=>{
    
    const track = await trackModel.create(req.body)
    if(!track){
        return next(new AppError("Track not created",500))
    }
    const notification = await notificModel.create({
        content: ` يمكنك المشاركة بها الان ،${req.body.trackName} قام المسؤول باضافة جولة جديدة  `
    })
    return res.json({message:"success",track})
}

export const updateTrack=async(req,res,next)=>{
    const track = await trackModel.findById(req.params.id)
    if(! track){
     return next(new AppError("track not found",404))

    }
   track.trackName=req.body.trackName;
   track.distance=req.body.distance;
   track.start_point=req.body.start_point;
   track.end_point=req.body.end_point;
   track.date=req.body.date;
   track.description=req.body.description;
   track.maxParticipants=req.body.maxParticipants;
   track.updatedBy=req.user._id;
   track.save()
   const notification = await notificModel.create({
     content: ` اطلع عليها اذا كنت مهتم بذلك ،${track.trackName} قام المسؤول بالتعديل على جولة  `
   })
    return res.json({message:"success",track})
}
export const getTracks= async (req,res,next)=>{
  //  const {skip,limit}= pagination(req.query.page,req.query.limit)
    const tracks = await trackModel.find({})/*.skip(skip).limit(limit)*/.populate({
        path:'participants',
        select:'name user_id'
    })
    return res.json({message:"success",tracks})
}

export const getDetails = async (req,res,next)=>{
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
            select:'name user_id phone email'
         }
    ])
    if(!track){
        return next(new AppError("track not found",404))
    }
    return res.status(200).json({message:"success",track})
}

export const getByDate = async(req,res,next)=>{
    const {date}=req.query;
    const tracks= await trackModel.find({
        date: { $gte: new Date(date) },
    })
    return res.json({message:"success",tracks})
}
export const getByName = async(req,res,next)=>{
    const {name}=req.params;
   
    const track= await trackModel.find({
        trackName: name,
    })
    if(!track){
        return res.status(404).json({message:"track not found"})
    }
    return res.json({message:"success",track})
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
        return  next(new AppError('Error in liking the track',500))
    }
    return res.json({message:"success",like})
}

export const createComment = async(req,res,next)=>{
    if(req.user.status =='Blocked'){
        return next(new AppError("You are blocked.. you cant comment",403))
    }
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

export const deleteTrack=async(req,res,next)=>{
    const deletedTrack=await trackModel.findByIdAndDelete(req.params.id)
    if(!deletedTrack){
        return next(new AppError("track not found",404))
    }
    const notification = await notificModel.create({
    content: ` تأكد من ذلك ، ${deleteTrack.trackName} قام المسؤول بإلغاء جولة   `
    })
    return res.status(201).json({message:"success",deletedTrack})
}


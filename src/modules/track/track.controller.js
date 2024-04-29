import trackModel from "../../../DB/models/Track.model.js";


export const addTrack= async(req,res,next)=>{
    const{trackName,date,distance,start_point,end_point,difficulty_level,number_of_participants}=req.body;
    const track = await trackModel.create({trackName,date,distance,start_point,end_point,difficulty_level,number_of_participants})
    if(!track){
        return next(new Error("Track not created"))
    }
    return res.json({message:"success",track})
}

export const getTracks= async (req,res,next)=>{
    const tracks = await trackModel.find({})
    return res.json({message:"success",tracks})
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

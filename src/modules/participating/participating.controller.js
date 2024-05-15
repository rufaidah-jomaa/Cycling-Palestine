import trackModel from "../../../DB/models/Track.model.js";
import ParticipatingModel from "../../../DB/models/participating.model.js";

export const getpartest=(req,res)=>{
    return res.json('participating')
}

export const participate= async(req,res)=>{
    
    const {t_id}=req.params;
    const today = new Date();
    if(!req.user.birthdate){
        return res.json("Enter your date of birth in your profile plz")
    }
   const age = today.getFullYear() - req.user.birthdate.getFullYear();
    if(age < 13){
        return res.json({message:"Your age is less than the permissible limit "})
    }
    const checkpar = await ParticipatingModel.findOne({track_id:t_id , user_id : req.user.id})
    if(checkpar){
        return res.json({message:"You have already participated in this track."})
    }
    const participate = await ParticipatingModel.create({name:req.user.userName,
        user_id:req.user._id,
        track_id:t_id
    })
    
    const updateNumP= await trackModel.findOneAndUpdate({_id:t_id}, { $inc : {number_of_participants:1}},{new:true})
    return res.status(200).json({message:"succuess",participate})
}

export const cancel =async(req,res)=>{
    const {t_id}=req.params
    const cancel = await ParticipatingModel.findOneAndDelete({track_id:t_id , user_id : req.user.id})
    const updateNumP= await trackModel.findOneAndUpdate({_id:t_id},{ $inc : {number_of_participants:-1}},{new:true})
    return res.status(200).json({message:"You have successfully canceled your subscription to this track",cancel})
}
import trackModel from "../../../DB/models/Track.model.js";
import ParticipatingModel from "../../../DB/models/participating.model.js";
import sendEmail from "../../services/sendEmail.js";

export const getpartest=(req,res)=>{
    return res.json('participating')
}

export const participate= async(req,res)=>{
    
    if(req.user.status =='Blocked'){
        return res.json({message:"You are blocked.. you cant participate this track"})
    }

    const {t_id}=req.params;
    const track = await trackModel.findById(t_id);
    if(!track){
        return res.status(404).json({message:"track not found!"})
    }

    if(track.date<new Date()){
        return res.json({message:"this track is finished"})
    }
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
    if( track.maxParticipants == track.number_of_participants){
        return res.json({message:"Sorry! The track is full."})
    }
    const participate = await ParticipatingModel.create({name:req.user.userName,
        user_id:req.user._id,
        track_id:t_id
    })
    
    const updateNum= await trackModel.findOneAndUpdate({_id:t_id}, { $inc : {number_of_participants:1}},{new:true}) //update #of participants
    const html=
    `<h2>'أهلاً بك في رحلة جديدة على البسكليت.. سعيدون لمشاركتنا معك رحلة مليئة بالمغامرات و المعلومات الجديدة.. نتمنى لك القدر الاكبر من الافادة و المتعة!'</h2>`
    sendEmail(req.user.email,'أهلا بك برحلة جديدة في بلادنا!',html)
    return res.status(200).json({message:"succuess",participate})
    
}

export const cancel =async(req,res)=>{
    const {t_id}=req.params
    const track = await trackModel.findById(t_id);
    if(!track){
        return res.status(404).json({message:"track not found!"})
    }
    const cancel = await ParticipatingModel.findOneAndDelete({track_id:t_id , user_id : req.user.id})
    const updateNumP= await trackModel.findOneAndUpdate({_id:t_id},{ $inc : {number_of_participants:-1}},{new:true})
    return res.status(200).json({message:"You have successfully canceled your subscription to this track",cancel})
}
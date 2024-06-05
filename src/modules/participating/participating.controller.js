import trackModel from "../../../DB/models/Track.model.js";
import ParticipatingModel from "../../../DB/models/participating.model.js";
import { AppError } from "../../services/AppError.js";
import sendEmail from "../../services/sendEmail.js";

export const getpartest=(req,res)=>{
    return res.json('participating')
}

export const participate= async(req,res,next)=>{
    
    if(req.user.status =='Blocked'){
        return next (new AppError("You are blocked.. you cant participate this track",403))
    }

    const {t_id}=req.params;
    const track = await trackModel.findById(t_id);
    if(!track){
        return next (new AppError("track not found!",404))
    }

    if(track.date<new Date()){
        return next (new AppError("this track is finished",403))

    }
    const today = new Date();
    if(!req.user.birthdate){
       // return res.json("Enter your date of birth in your profile plz")
        return next (new AppError("Enter your date of birth in your profile plz",403))

    }
   const age = today.getFullYear() - req.user.birthdate.getFullYear();
    if(age < 13){
      //  return res.json({message:"Your age is less than the permissible limit "})
        return next (new AppError("Your age is less than the permissible limit",403))

    }
  
    const checkpar = await ParticipatingModel.findOne({track_id:t_id , user_id : req.user.id})
    if(checkpar){
        return next (new AppError("You have already participated in this track.",409))

    }
    if( track.maxParticipants == track.number_of_participants){
        return next (new AppError("Sorry! The track is full.",403))

    }
    const participate = await ParticipatingModel.create({name:req.user.userName,
        user_id:req.user._id,
        track_id:t_id
    })
    
    const updateNum= await trackModel.findOneAndUpdate({_id:t_id}, { $inc : {number_of_participants:1}},{new:true}) //update #of participants
    const html=
    ` <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 10px;
                text-align: center;
                font-size: 24px;
            }
            .content {
                margin: 20px 0;
                text-align: center;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
                font-size: 16px;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding: 10px;
                color: #999999;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container" direction: "rtl">
            <div class="header">
            أهلا بك برحلة جديدة في بلادنا
            </div>
            <div class="content">
                <h1>!${userName},مرحباً</h1>
                <p>نحن سعداء بانضمامك إلينا. نشكرك على التسجيل معنا.</p>
                <p>'أهلاً بك في رحلة جديدة على البسكليت.. سعيدون لمشاركتنا معك رحلة مليئة بالمغامرات و المعلومات الجديدة.. نتمنى لك القدر الاكبر من الافادة و المتعة!</p>
                
             </div>
           
            <div class="footer">
                &copy; ${new Date().getFullYear()} Our Service. All rights reserved.
            </div>
        </div>
    </body>
    </html>`
    sendEmail(req.user.email,'Cycling Palestine',html)
    return res.status(200).json({message:"success",participate})
    
    
}

export const cancel =async(req,res,next)=>{
    const {t_id}=req.params
    const track = await trackModel.findById(t_id);
    if(!track){
        return next(new AppError("track not found!",404))
    }
    const cancel = await ParticipatingModel.findOneAndDelete({track_id:t_id , user_id : req.user.id})
    const updateNumP= await trackModel.findOneAndUpdate({_id:t_id},{ $inc : {number_of_participants:-1}},{new:true})
    return res.status(200).json({message:"You have successfully canceled your subscription to this track",cancel})
}
import notificModel from "../../../DB/models/Notifications.model.js"

export const getNotifications=async(req,res)=>{
  const notifications=await notificModel.find({});
  return res.status(201).json({message:"success",notification})
}
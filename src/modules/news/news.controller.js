import newsModel from "../../../DB/models/news.model.js";

export const add = async(req,res)=>{
    const {content}=req.body;
    const addedNew = await newsModel.create({content});
    if(!addedNew){
        return res.status(400).json({message:"error while adding"})
    }
    res.status(200).json({message:"success",addedNew});
}

export const getNews= async(req,res)=>{
    const news = await newsModel.find({})
    return res.status(201).json({message:"success",news})
}

export const update = async(req,res)=>{
    const {id}=req.params;
    const {content}=req.body;
    const updatedNew = await newsModel.findByIdAndUpdate(id,{content:content},{new:true})
    if(!updatedNew){
        return  res.status(400).json({message:"error while updating"})
    }
    return res.status(200).json({message:"success",updatedNew})
}

export const destroy = async(req,res)=>{
    const {id}=req.params;
    const deletedNew = await newsModel.findByIdAndDelete(id)
    if(!deletedNew){
        return  res.status(400).json({message:"error while deleting"})
    }
    return res.status(200).json({message:"success",deletedNew})
}
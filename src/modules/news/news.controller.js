import newsModel from "../../../DB/models/news.model.js";

export const add = async(req,res,next)=>{
    const {title,content,date}=req.body;
    const addedNew = await newsModel.create({title,content,date});
    if(!addedNew){
        return next(new AppError('error while adding',500))
    }
    res.status(200).json({message:"success",addedNew});
}

export const getNews= async(req,res)=>{
    const news = await newsModel.find({})
    return res.status(201).json({message:"success",news})
}

export const update = async(req,res,next)=>{
    const {id}=req.params;
    const {content}=req.body;
    const updatedNew = await newsModel.findByIdAndUpdate(id,{content:content},{new:true})
    if(!updatedNew){
        return next(new AppError('error while updating',500))

    }
    return res.status(200).json({message:"success",updatedNew})
}

export const destroy = async(req,res,next)=>{
    const {id}=req.params;
    const deletedNew = await newsModel.findByIdAndDelete(id)
    if(!deletedNew){
        return next(new AppError('error while deleting',500))

    }
    return res.status(200).json({message:"success",deletedNew})
}
import newsModel from "../../../DB/models/news.model.js";
import { AppError } from "../../services/AppError.js";
import cloudinary from "../../services/cloudinary.js";

export const add = async(req,res,next)=>{

    const {title,content,date}=req.body;
    if(req.files.video){
      return res.json(req.files.video)
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.video[0].path,
       { resource_type: 'video',
        folder:`${process.env.App_Name}/news/${title}`})
        req.body.video={secure_url,public_id}
       }
       
       req.body.images=[]
       if(req.files.images){
        for (const file of req.files.images) {
            // file: iteration
            const { secure_url, public_id } = await cloudinary.uploader.upload(
              file.path,
              { folder: `${process.env.App_Name}/news/${title}` });

            req.body.images.push({secure_url,public_id});
            }
         }
        const addedNew = await newsModel.create(req.body);
        if(!addedNew){
         return next(new AppError('error while adding',400))
         }
        res.status(200).json({message:"success",addedNew});
}

export const getNews= async(req,res)=>{
    const news = await newsModel.find({})
    return res.status(201).json({message:"success",news})
}

export const update = async(req,res,next)=>{
    const {id}=req.params;
    const {content,title,date}=req.body;
    const theNew = await newsModel.findById(id)
    if(!theNew){
        return next(new AppError('The new is not found',404))
    }
    
   if(req.files.video){
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.video[0].path,
            {resource_type: 'video',
          folder:`${process.env.App_Name}/news/${req.body.title}`})
        await cloudinary.uploader.destroy(theNew.video.public_id)
        theNew.video = {secure_url,public_id}
    }
 
    if(req.files.images){
       async function deleteImages () {
           for (const element of theNew.images) {
               await cloudinary.uploader.destroy(element.public_id)    
           }
         }
         deleteImages()
         req.body.images=[]
         theNew.images=[]
      for (const file of req.files.images) { // file: iteration   
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
               {folder:`${process.env.App_Name}/news/${req.body.title}`})
               req.body.images.push({secure_url,public_id})
       }
       theNew.images=req.body.images
      }

    theNew.save()
    return res.status(200).json({message:"success",theNew})
}

export const destroy = async(req,res,next)=>{
    const {id}=req.params;
    const deletedNew = await newsModel.findByIdAndDelete(id)
    if(!deletedNew){
        return next(new AppError('error while deleting',500))

    }
    if(deletedNew.video){
    await cloudinary.uploader.destroy(deletedNew.video.public_id);
    }
    if(deletedNew.images){
    async function deleteImages() {
      for (const element of deletedNew.images) {
        await cloudinary.uploader.destroy(element.public_id);
      }
    }
    deleteImages();
  }
    return res.status(201).json({ message: "success", deletedNew });
  
}
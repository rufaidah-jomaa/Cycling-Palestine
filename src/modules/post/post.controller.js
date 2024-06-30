import commentModel from "../../../DB/models/Comment.model.js";
import notificModel from "../../../DB/models/Notifications.model.js";
import postModel from "../../../DB/models/Post.model.js";
import { AppError } from "../../services/AppError.js";
import cloudinary from "../../services/cloudinary.js";
import { pagination } from "../../services/pagination.js";

export const getPosts = async (req, res, next) => {
  //const {skip,limit}=pagination(req.query.page,req.query.limit)
  const posts = await postModel.find({}).select('title mainImage description images')/*.skip(skip).limit(limit)/*.populate([
    {
      path: "user_id",
      select: "userName",
    },
    {
      path: "like",
      select: "userName",
    },
    {
      path: "comments",
      select: "text userName",
    },
  ]);*/
  return res.json({ message: "success", posts });
};

export const getDetailes = async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findById(id).populate([
    {
      path: "like",
      select: "userName",
    },{
    path: "comments",
    select:'text userName userImage user_id'
    },
])
  return res.status(200).json({ message: "success", post });
};

export const createPost = async(req, res, next) => {

  const { title } = req.body;
  const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
    {folder:`${process.env.App_Name}/posts/${title}`})
       req.body.mainImage= {secure_url,public_id} 
       
  req.body.images = [];
  for (const file of req.files.images) {
    // file: iteration
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { folder: `${process.env.App_Name}/posts/${title}` }
    );
    req.body.images.push({secure_url,public_id});
  }
  req.body.user_id = req.user._id;
  
  const post = await postModel.create(req.body);
  if (!post) {
    return next(new AppError("Couldn't create post",500));
  }
  const notification = await notificModel.create({
    content: ` يمكنك التفاعل معه الان ${title} قام المسؤول باضافة منشور جديد حول `
  });

  return res.json({ message: "success", post });
};

export const likePost = async (req, res, next) => {
  const user_id = req.user._id;
  const { id } = req.params; //postID
  const post = await postModel.findById(id);
  if (!post) {
    return next(new AppError("post not found",404));

  }
  const like = await postModel.findByIdAndUpdate(
    { _id: id },
    {
      $addToSet: {
        like: user_id,
      },
    },
    { new: true }
  );
  if (!like) {
    return next(new AppError("Error in liking the Post",500));
  }
  return res.json({ message: "success", like });
};

export const createComment = async (req, res, next) => {
  if (req.user.status == "Blocked") {
    return next(new AppError("You are blocked.. you cant comment",403));

  }
  req.body.userName = req.user.userName;
  req.body.userImage=req.user.image
  req.body.user_id = req.user._id;
  req.body.post_id = req.params.id;
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(new AppError("post not found",404));

  }
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.App_Name}/comments/${req.body.post_id}` }
    );
    req.body.image = { secure_url, public_id };
  }
  const comment = await commentModel.create(req.body);
  return res.json({ message: "success", comment });
};

export const updatePost = async (req,res,next) => {
 
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return next(new AppError("post not found",404));
  }
  post.title = req.body.title;
  post.body = req.body.body;
  
  if(req.files.mainImage){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,
      {folder:`${process.env.App_Name}/posts/${req.body.title}`})
  await cloudinary.uploader.destroy(post.mainImage.public_id)
  post.mainImage = {secure_url,public_id}
  }
  req.body.images=[]
  if(req.files.images){  
     async function deleteImages () {
         for (const element of product.subImages) {
             await cloudinary.uploader.destroy(element.public_id)    
         }
       }
       deleteImages()
       post.images=[]
    for (const file of req.files.images) { // file: iteration   
      const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,
             {folder:`${process.env.App_Name}/posts/${req.body.title}`})
             req.body.images.push({secure_url,public_id})
     }
     post.images=req.body.images
    }
  post.save();
  return res.status(201).json({ message: "success", post });
};
export const deletePost = async (req, res,next) => {
  const deletedPost = await postModel.findByIdAndDelete(req.params.id);
  if (!deletedPost) {
    return next(new AppError("post not found",404));

  }
  await cloudinary.uploader.destroy(deletedPost.mainImage.public_id);
  async function deleteImages() {
    for (const element of deletedPost.images) {
      await cloudinary.uploader.destroy(element.public_id);
    }
  }
  deleteImages();
  return res.status(201).json({ message: "success", deletedPost });
};

export const deleteComment = async (req, res,next) => {
  //for post and track the same link

  const comment = await commentModel.findById(req.params.id);
  if (!comment) {
    return next(new AppError("comment not found",404));

  }
  if (req.user._id.equals(comment.user_id) || req.user.role === 'Admin') {
    await commentModel.findByIdAndDelete(req.params.id);
  }
  if(comment.image){
  await cloudinary.uploader.destroy(comment.image.public_id);
  }
  return res.status(200).json({ message: "comment deleted successfully", comment });
};
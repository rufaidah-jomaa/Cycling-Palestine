import commentModel from "../../../DB/models/Comment.model.js";
import notificModel from "../../../DB/models/Notifications.model.js";
import postModel from "../../../DB/models/Post.model.js";
import cloudinary from "../../services/cloudinary.js";

export const getPosts = async (req, res, next) => {
  const posts = await postModel.find({}).populate([
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
  ]);
  return res.json({ message: "success", posts });
};

export const getDetailes = async (req, res) => {
  const { id } = req.params;
  const post = await postModel.findById(req.params.id).populate([
    {
      path: "like",
      select: "userName",
    },{
    path: "comments",
    select:'text userName'
    },
])
  return res.status(200).json({ message: "success", post });
};

export const createPost = async (req, res, next) => {
    
  const { title, description } = req.body;
  
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
    req.body.images.push({ secure_url, public_id });
  }
  req.body.user_id = req.user._id;
  const post = await postModel.create(req.body);
  if (!post) {
    return next(new Error("Couldn't create post"));
  }
  const notification = await notificModel.create({
    content: "قام المسؤول باضافة منشور جديد يمكنك التفاعل معه الان!",
  });

  return res.json({ message: "success", post });
};

export const likePost = async (req, res, next) => {
  const user_id = req.user._id;
  const { id } = req.params; //postID
  const post = await postModel.findById(id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
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
    return next(new Error("Error in liking the Post"));
  }
  return res.json({ message: "success", like });
};

export const createComment = async (req, res, next) => {
  if (req.user.status == "Blocked") {
    return res.json({ message: "You are blocked.. you cant comment" });
  }
  req.body.userName = req.user.userName;
  req.body.user_id = req.user._id;
  req.body.post_id = req.params.id;
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
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

export const updatePost = async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "success" });
  }
  post.title = req.body.title;
  post.body = req.body.body;
  if(req.files.mainImage){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,
      {folder:`${process.env.App_Name}/posts/${req.body.title}`})
  await cloudinary.uploader.destroy(post.mainImage.public_id)
  post.mainImage = {secure_url,public_id}
  }
  if (req.files.images) {
    //
  }
  post.save();
  return res.status(201).json({ message: "success", post });
};
export const deletePost = async (req, res) => {
  const deletedPost = await postModel.findByIdAndDelete(req.params.id);
  if (!deletedPost) {
    return res.status(404).json({ message: "post not found" });
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

export const deleteComment = async (req, res) => {
  //for post and track the same link

  const comment = await commentModel.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "comment not found" });
  }
  if (req.user._id == comment.user_id) {
    await commentModel.findByIdAndDelete(req.params.id);
  }

  await cloudinary.uploader.destroy(comment.image.public_id);
  return res
    .status(200)
    .json({ message: "comment deleted successfully", comment });
};
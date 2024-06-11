import userModel from "../../../DB/models/User.model.js";
import { AppError } from "../../services/AppError.js";
import cloudinary from "../../services/cloudinary.js";

export const getUsers = async (req, res) => {
  const users = await userModel
    .find({})
    .select("userName image role status Address email");
  res.status(200).json({ message: "success", users });
};

export const getProfile = async (req, res, next) => {
  if (req.user.status == "Blocked") {
    return next(new AppError("you ara blocked",403))
  }
  const user = await userModel.findById(req.user._id);
  return res.json({ message: "success", user });
};

export const uploadPic = async (req, res, next) => {
  const { secure_url,public_id } = await cloudinary.uploader.upload(
        req.file.path,
    { folder: `${process.env.App_Name}/users` }
  );
  const user = await userModel.findByIdAndUpdate(
    { _id: req.user._id },
    { image: { secure_url,public_id }},
    { new: true }
  );
  return res.json({ message: "success", user });
};

export const deleteImage = async (req, res,next) => {

  const user = await userModel.findById(req.user._id)
  await cloudinary.uploader.destroy(user.image.public_id)
  const deletedImage = await userModel.updateOne(
    { _id: req.user._id },
    { $unset: { image: "" } }
  );
   
  if (deletedImage.modifiedCount === 1) {
    return res.json({ message: "success" });
  } else {
    return next(new AppError("not deleted",500))
  }
};
export const updateProfile = async (req, res,next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new AppError("user not found",404))
  }
  user.userName = req.body.userName;
  user.gender = req.body.gender;
  user.birthdate = req.body.birthdate; //birthdate
  user.phone = req.body.phone;
  user.Address = req.body.Address; //Address
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      { folder: `${process.env.App_Name}/users` }
    );
    if (user.image.public_id) {
      await cloudinary.uploader.destroy(user.image.public_id);
    }
    user.image = { secure_url, public_id };
  }
  await user.save();
  return res.json({ message: "success", user });
};
export const deleteAccount = async (req, res,next) => {
  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError("user not found",404))
  }
  return res.json({ message: "success", deletedUser: user });
};

export const blockUser = async (req, res,next) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      status: "Blocked",
    },
    { new: true }
  );
  if (!user) {
    return next(new AppError("user not found",404))
  }
  return res.json({ message: "success", user });
};

export const unBlockUser = async (req, res,next) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      status: "Active",
    },
    { new: true }
  );
  if (!user) {
    return next(new AppError("user not found",404))
  }
  return res.json({ message: "success", user });
};
export const addAdmin = async (req, res,next) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      role: "Admin",
    },
    { new: true }
  );
  if (!user) {
    
    return next(new AppError("user not found",404))
  }
  return res.json({ message: "success", user });
};

export const removeAdmin = async (req, res,next) => {
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      role: "User",
    },
    { new: true }
  );
  if (!user) {
    return next(new AppError("user not found",404))
  }
  return res.json({ message: "success", user });
};

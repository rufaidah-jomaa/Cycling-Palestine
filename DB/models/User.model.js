import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["ذكر", "انثى"],
    },
   
    birthdate: {
      type: Date,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Object,
    },
    phone: {
      type: String,
    },
    Address: {
      type: String,
      
    },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Blocked"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    sendCode:{
      type:String,
      default:null
    },
  
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);
export default userModel;

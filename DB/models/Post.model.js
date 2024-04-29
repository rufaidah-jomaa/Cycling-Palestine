import {mongoose,Schema,model, Types} from 'mongoose'
const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    user_id:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    like:[
     {
        type:Types.ObjectId,
        ref:"User"  
     }
    ]
    },{
        timestamps:true
    })
    const postModel=model("Post",postSchema)
    export default postModel;
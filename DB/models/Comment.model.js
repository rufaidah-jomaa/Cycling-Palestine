import {mongoose,Schema,model, Types} from 'mongoose'
const commentSchema = new Schema({
   text:{
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
    userName:{
       type:String,
        required:true  
    },
    post_id:{
        type:Types.ObjectId,
        ref:"Post",  
    },
    track_id:{
        type:Types.ObjectId,
        ref:"Track",
    }
    
    },{
        timestamps:true
    })
    const commentModel=model("Comment",commentSchema)
    export default commentModel;
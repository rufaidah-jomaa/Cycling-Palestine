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
        timestamps:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    })
    postSchema.virtual('comments',{
        localField:'_id',
        foreignField:'post_id',
        ref:'Comment'
    })
    const postModel=model("Post",postSchema)
    export default postModel;
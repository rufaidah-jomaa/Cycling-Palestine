
import {mongoose,Schema,model, Types} from 'mongoose'
const formSchema = new Schema({
    approval:{
        type:String,
        enum:['اوافق','لا اوافق'],
        required:true
    },
   user_id:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    track_id:{
        type:Types.ObjectId,
        ref:"Track",
        required:true
    },
   isPaid:{
        type:Boolean,
        required:true,
    }
    
    },{
        timestamps:true
    })
    const ParticipatingModel=model("Participating",participatingSchema)
    export default ParticipatingModel;
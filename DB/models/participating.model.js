
import {mongoose,Schema,model, Types} from 'mongoose'
const participatingSchema = new Schema({
    name:{
        type:String,
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
    phone:{
      type:String
    },
     email: {
     type: String,
   
    unique: true,
    },
   isPaid:{
        type:Boolean,
        default:false,
        //required:true,
    }
    
    },{
        timestamps:true
    })
    const ParticipatingModel=model("Participating",participatingSchema)
    export default ParticipatingModel;
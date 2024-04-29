
import {mongoose,Schema,model, Types} from 'mongoose'
const participatingSchema = new Schema({
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
        required:true
    }
    
    },{
        timestamps:true
    })
    const ParticipatingModel=model("Participating",participatingSchema)
    export default ParticipatingModel;
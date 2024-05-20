
import {mongoose,Schema,model, Types} from 'mongoose'
const trackSchema = new Schema({
   trackName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    distance:{
        type:Number
    },
    start_point:{
        type:String,
        required:true
    },
    end_point:{
        type:String,
        required:true
    },
    difficulty_level:{
        type:String
    },
    number_of_participants:{
        type:Number,
        default:0
    },
    like:[{
           type:Types.ObjectId,
           ref:"User"  
        }],
    description:{
        type:String,
        required:true
    },
    maxParticipants:{
        type:Number,
    }
}  ,   {
     timestamps:true,
     toJSON:{virtuals:true},
     toObject:{virtuals:true}
    })

    trackSchema.virtual('comments',{
        localField:'_id',
        foreignField:'track_id',
        ref:'Comment'
    })
    trackSchema.virtual('participants',{
        localField:'_id', // primary key column from this model(parent)
        foreignField:'track_id', // foreign key column from second model(child)
        ref:'Participating' // name of child model 
    })

    const trackModel= model("Track",trackSchema);
    export default trackModel;
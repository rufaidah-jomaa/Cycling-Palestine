
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
        type:Number
    }
    
    },{
        timestamps:true
    })
    const trackModel= model("Track",trackSchema);
    export default trackModel;
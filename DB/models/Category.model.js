import mongoose, { Schema, Types, model } from 'mongoose';

const categprySchema = new Schema({
   name:{
        type:String,
        unique:true,
        required:true
    },
    image:{
        type:Object,
        required :true
    },
    slug:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active', 'notActive']
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
       
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',

    }
},
{
timestamps:true
})

const categoryModel = model('Category',categprySchema);
export default categoryModel;
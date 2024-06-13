import mongoose, { Schema, model } from 'mongoose'
const newsSchema= new Schema ({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    images:[{
        type:Object
    }],
    video: {
        type:Object,  
    },
    date:{
        type:Date,
        required:true  
    }
})

const newsModel = model('News',newsSchema)
export default newsModel;
import mongoose, { Schema, model } from 'mongoose'
const newsSchema= new Schema ({
    content:{
        type:String,
        required:true
    }
})

const newsModel = model('News',newsSchema)
export default newsModel;
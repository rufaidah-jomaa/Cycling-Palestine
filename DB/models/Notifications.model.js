import mongoose, { Schema, model } from 'mongoose'

const notificSchema= new Schema({
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
    }
},{
    timestamps:true
})

const notificModel = model('Notification',notificSchema)
export default notificModel;
import mongoose from 'mongoose';
 const connectDB=()=>{
    mongoose.connect(`${process.env.DB}`)
  .then((result) => {
    console.log('Connected!')
  })
  .catch((error)=>{
    console.log(error)
  })
}
 export default connectDB

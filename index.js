import express from 'express'
import 'dotenv/config'
import { initApp } from './app.router.js';
const app = express();
const PORT = process.env.PORT
initApp(app,express)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
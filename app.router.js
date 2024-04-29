import cors from 'cors'
import connectDB from "./DB/connection.js";

import authRouter from './src/modules/auth/auth.router.js'
import userRouter from './src/modules/user/user.router.js'
import notificationRouter from './src/modules/notification/notification.router.js'
import orderRouter from './src/modules/order/order.router.js'
import participatingRouter from './src/modules/participating/participating.router.js'
import paymentRouter from './src/modules/payment/payment.router.js'
import productRouter from './src/modules/product/product.router.js'
import storeRouter from './src/modules/store/store.router.js'
import trackRouter from './src/modules/track/track.router.js'
import postRouter from './src/modules/post/post.router.js'
import { globalErrorHandling } from "./src/services/errorHandling.js";

export const initApp = (app,express)=>{
    connectDB;
    var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
    app.use(express.json()); //
  connectDB();
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/notification',notificationRouter)
    app.use('/order',orderRouter);
    app.use('/participating',participatingRouter)
    app.use('/payment',paymentRouter)
    app.use('/product',productRouter)
    app.use('/store',storeRouter)
    app.use('/track',trackRouter)
    app.use('/post',postRouter)
    app.use("*",(req,res)=>{
        return res.json("Page Not Found")
    })
    app.use(globalErrorHandling)
}
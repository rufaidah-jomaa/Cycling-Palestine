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
import categoryRouter from './src/modules/category/category.router.js'
import { globalErrorHandling } from "./src/services/errorHandling.js";

export const initApp = (app,express)=>{
     connectDB();
<<<<<<< HEAD
     app.use(cors())
     app.use(express.json()); //
      app.get("/", (req, res) => {
      return res.status(200).json("welcome");
      });
=======
    app.use(cors())
    app.use(express.json()); 
      app.get("/", (req, res) => {
    return res.status(200).json("welcome");
  });
>>>>>>> 64f6560c8978528202f97b831477e6b21c2e3505
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
    app.use('/category',categoryRouter)
    app.use("*",(req,res)=>{
        return res.json("Page Not Found")
    })
    app.use(globalErrorHandling)
}

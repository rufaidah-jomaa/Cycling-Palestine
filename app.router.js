import cors from "cors";
import connectDB from "./DB/connection.js";

import authRouter from "./src/modules/auth/auth.router.js";
import userRouter from "./src/modules/user/user.router.js";
import notificationRouter from "./src/modules/notification/notification.router.js";
import orderRouter from "./src/modules/order/order.router.js";
import participatingRouter from "./src/modules/participating/participating.router.js";
import paymentRouter from "./src/modules/payment/payment.router.js";
import productRouter from "./src/modules/product/product.router.js";
import trackRouter from "./src/modules/track/track.router.js";
import postRouter from "./src/modules/post/post.router.js";
import categoryRouter from "./src/modules/category/category.router.js";
import cartRouter from "./src/modules/cart/cart.router.js";
import couponRouter from "./src/modules/coupon/coupon.router.js";
import newsRouter from "./src/modules/news/news.router.js";
import { globalErrorHandling } from "./src/services/errorHandling.js";

export const initApp = (app, express) => {
  connectDB();
  var whitelist = ["https://cyclingpalestine.netlify.app","http://localhost:5173"];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: "GET,POST,PUT,DELETE,HEAD,PATCH",
      allowedHeaders: "Content-Type, Authorization",
      credentials: true,
      preflightContinue: false,
    })
  );

  app.use(express.json());
  app.get("/", (req, res) => {
    return res.status(200).json("welcome");
  });
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/notification", notificationRouter);
  app.use("/order", orderRouter);
  app.use("/participating", participatingRouter);
  app.use("/payment", paymentRouter);
  app.use("/product", productRouter);
  app.use("/track", trackRouter);
  app.use("/post", postRouter);
  app.use("/category", categoryRouter);
  app.use("/cart", cartRouter);
  app.use("/coupon", couponRouter);
  app.use("/news", newsRouter);
  app.use("*", (req, res) => {
    return res.json("Page Not Found");
  });
  app.use(globalErrorHandling);
};

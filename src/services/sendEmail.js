import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplete.js";

async function sendEmail(to,subject,userName,token,refreshToken){
    const transporter = nodemailer.createTransport({
       service:"gmail",
        auth: {
          user: process.env.emailSender,
          pass: process.env.passSender,
        },
      });

      const info = await transporter.sendMail({
        from: `Cycling Palestine ${process.env.emailSender}`, // sender address
        to, // list of receivers,
        subject,// Subject lin
        html :emailTemplate(to,userName,token,refreshToken)
      });
}
export default sendEmail;
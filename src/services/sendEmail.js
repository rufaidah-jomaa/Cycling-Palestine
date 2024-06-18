import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplete.js";

async function sendEmail(to,subject,userName,token,refreshToken,subjectC, attachFile = false){
  let attachments = [];
  if (attachFile) {
    attachments.push({
      filename: "invoice.pdf", // Provide a default filename
      path: "invoice.pdf" // Provide the path to the invoice PDF
    });
  }
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
        html :emailTemplate(to,userName,token,refreshToken,subjectC),
        attachments
      });
}
export default sendEmail;
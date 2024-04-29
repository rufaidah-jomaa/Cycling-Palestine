import nodemailer from "nodemailer";

async function sendEmail(to,subject,html){
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
        html // html body
      });
}
export default sendEmail;
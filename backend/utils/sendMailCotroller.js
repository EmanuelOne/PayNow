import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import generateToken from "./generateToken.js";
export const sendMail = async ({ email, text, subject }) => {
  // let verifyCode = Math.floor(100000 + Math.random() * 900000)
  //   .toString()
  //   .substring(0, 4);
  // generateToken()

  if (!email) throw new Error("Email is required!!");

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "mail@payeaxi.com",
      pass: "85740014Jg", // generated ethereal password
    },
  });
  // verify connection configuration
  // transporter.verify(function (error, success) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Server is ready to take our messages");
  //     console.log(success);
  //   }
  // });
  let mailOptions = {
    from: "mail@payeaxi.com",
    to: email,
    subject: subject,
    html: text,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      throw new Error("Error " + err);
    } else {
      res.json("Email sent successfully");
    }
  });
};

import expressAsyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import generateToken from "./generateToken.js";
export const sendMail = expressAsyncHandler(async (req, res) => {
  // const userVerified = await user.save();

  const { email, _id } = req.user;
  // let verifyCode = Math.floor(100000 + Math.random() * 900000)
  //   .toString()
  //   .substring(0, 4);
  // generateToken()
  if (!email) throw new Error("Email is required!!");

  const config = {
    access_token:
      "ya29.a0AfH6SMBG2zwAJ0jjeMe2kuORuDqXTaEcmks5jL8y-rT2ki3vhRSNBTb1m3zf1Fx_r0Jzhr5dSehmJz7Uye6F1d9Iwypc1yq18gtsq68zRrgkT0guOIYhJP92N22CAc2Bj8fZnJK6K_SEdGvi4rgGdaZroEnA",
    scope: "https://mail.google.com/",
    token_type: "Bearer",
    expires_in: 3599,
    refresh_token:
      "1//04zN-SfAYzrqtCgYIARAAGAQSNwF-L9IrU8WWMMc8rbOWej46l0gQSui41cLxyohNL-5ZDxkxefy1pJ-yu815uIaQKAQ57AHNpjE",
  };
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "emanuelmechie@gmail.com",
      pass: "85740014Jg",
      clientId:
        "434200573777-jpka0pu5bkvd9er1u22c8njv4r0vfve3.apps.googleusercontent.com",
      clientSecret: "mpFDvkSG5_OXjVC2oihhblAe",
      refreshToken: config.refresh_token,
    },
  });
  // http://google.com/
  let mailOptions = {
    from: "emanuelmechie@gmail.com",
    to: email,
    subject: "Verify your Account PayEasy",
    html: `<p>Verification Code <a target="_blank" href=${
      "http://localhost:5000" + process.env.API_VERSION
    }/verify?verify=${generateToken(
      _id
    )}>Cick Here to verify your account</a></p>`,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      throw new Error("Error " + err);
    } else {
      res.json("Email sent successfully");
    }
  });
});

import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();
import path from "path";
const cloudinaryConfig = () =>
  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUNDAPIKEY,
    api_secret: process.env.CLOUDSECRETEKEY,
    secure: true,
  });
function uploader(req, res, next) {
  console.log("uploader called");
  let file = req.file.path;
  file = path.join(path.resolve(), file);
  // console.log(file);

  cloudinary.uploader
    .upload(file)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  next();
}

export { uploader };

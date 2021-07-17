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
function uploader(image) {
  image = path.join(path.resolve(), image);
  console.log(image);

  cloudinary.uploader.upload(image, (err, result) => {
    if (err) throw new Error(err);
    console.log(result);
  });
}

export { uploader };

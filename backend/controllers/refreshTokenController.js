import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const getRefreshToken = asyncHandler(async (req, res) => {
  const { token, email } = req.body;
  const user = await User.findOne({ email });
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.staus(302).json("Token is fine!!");
  } catch (error) {
    if (user) return res.json({ token: generateToken(user._id) });
    res.status(400).json("Incorrect Email");
  }
});
export { getRefreshToken };

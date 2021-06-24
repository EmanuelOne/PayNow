import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const getRefreshToken = asyncHandler(async (req, res) => {
  //   const user = await User.findById(req.user._id).select("-password -pin");

  const { token } = req.body;
  // console.log(token);
  // if (!token) res.status(401).json("Invalid refresh token");
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      const { id } = user;

      res.json({ token: generateToken(id) });
    });
    // console.log(decode);
  } else {
    res.status(401).json("Invalid refresh token");
  }
});
export { getRefreshToken };

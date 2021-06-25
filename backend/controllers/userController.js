import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendMailCotroller.js";
// @desc    Auth user & get token
// @route   POST /api/v1/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      refreshToken: generateToken(user._id, "refreshToken"),
      accountID: user.accountId,
      isVerified: user.isVerified,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// @desc    Register User
// @route   POST /api/v1/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json("User already exists");
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/v1/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -pin");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/v1/register
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("deleted successfully not found");
  }
});
const deleteAllUser = asyncHandler(async (req, res) => {
  const user = await User.deleteMany({});

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("deleted successfully not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Send Reset Password
// @route   POST /api/v1/send_reset_password
// @access  PUBLIC

const sendResetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const { _id } = user;
    const text = `<p>Verification Code <a target="_blank" href=${
      process.env.URL + process.env.API_VERSION
    }/reset_password?reset=${generateToken(
      _id
    )}>Cick Here to Reset your Password</a></p>`;
    const subject = "Reset Your Password";
    sendMail({ email: user.email, text, subject });
    res.json("Email sent!!");
  } else res.status(401).json({ status: "Error", message: "Email not valid" });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded) {
    const user = await User.findById(decoded.id);
    if (user) {
      user.password = password;
      user.save();
      res.status(201).json("Password Reset Successfully");
      //come back here

      // res.redirect("https://google.com");
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user && !user.isVerified) {
    const { _id } = user;
    const text = `<p>Verification Code <a target="_blank" href=${
      process.env.URL + process.env.API_VERSION
    }/verify_email?verify=${generateToken(
      _id
    )}>Cick Here to verify your account</a></p>`;
    const subject = "Verify your account";
    sendMail({ email: user.email, text, subject });
    //come back here
    res.json(`email sent to ${user.email} successfully`);
  } else if (user.isVerified) res.status(403).json("User already verify");
  else {
    res.status(403);
    throw new Error("No user Found");
  }
});

const verifyUser = asyncHandler(async (req, res) => {
  const { verify } = req.query;

  const decoded = jwt.verify(verify, process.env.JWT_SECRET);
  if (decoded) {
    const { id } = decoded;
    const user = await User.findById(id).select("-password");
    user.isVerified = true;
    user.save();
    //come back here
    res.redirect("https://google.com");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  verifyUser,
  updateUser,
  verifyEmail,
  resetPassword,
  sendResetPassword,
};

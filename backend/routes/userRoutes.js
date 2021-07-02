import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyUser,
  verifyEmail,
  sendResetPassword,
  resetPassword,
  deleteAllUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/register").post(registerUser).get(getUsers);

router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/delete")
  .delete(deleteAllUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

router.route("/send_verify_email").post(protect, verifyEmail);
router.route("/verify_email").post(protect, verifyUser);
router.route("/reset_password").post(sendResetPassword).get(resetPassword);

export default router;

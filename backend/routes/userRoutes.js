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
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { sendMail } from "../utils/sendMailCotroller.js";

router.route("/register").post(registerUser).get(getUsers);

router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/delete")
  .delete(protect, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
router.route("/verify_email").post(protect, verifyEmail);
router.route("/verify").get(verifyUser);

export default router;

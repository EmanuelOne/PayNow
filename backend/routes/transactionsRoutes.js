import express from "express";
import {
  getReceiverInfoContoller,
  sendMoneyController,
} from "../controllers/sendMoneyController.js";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/send_money").post(protect, sendMoneyController);
router.route("/get_account_info").post(protect, getReceiverInfoContoller);
export default router;

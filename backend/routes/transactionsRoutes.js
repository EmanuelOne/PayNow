import express from "express";
import {
  changePin,
  createPin,
  deletePins,
  getPin,
} from "../controllers/pinController.js";
import {
  getReceiverInfoContoller,
  sendMoneyController,
} from "../controllers/sendMoneyController.js";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/send_money").post(protect, sendMoneyController);

router.route("/get_pin").get(protect, getPin);
router.route("/change_pin").post(protect, changePin);
router.route("/create_pin").post(protect, createPin);
router.route("/change_pin").post(protect, changePin);
router.route("/delete_pin").post(protect, deletePins);

router.route("/get_account_info").post(protect, getReceiverInfoContoller);
export default router;

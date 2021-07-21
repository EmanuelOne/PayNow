import express from "express";
import { getHistoryController } from "../controllers/historyController.js";
import { createPin } from "../controllers/pinController.js";

const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/history").get(protect, getHistoryController);
export default router;

import express from "express";
import { getRefreshToken } from "../controllers/refreshTokenController.js";
const router = express.Router();

router.route("/refresh_token").post(getRefreshToken);

export default router;

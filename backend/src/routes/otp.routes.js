import express from "express";
import { signup, login, forgotPassword, resetPassword ,verifyOTP } from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;

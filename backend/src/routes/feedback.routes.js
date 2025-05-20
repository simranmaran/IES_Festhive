import express from "express";
import {
  createFeedback,
  getAllFeedbacks,
  getUserFeedbacks
} from "../controllers/feedback.controller.js";
import { confirmUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", confirmUser, createFeedback);
router.get("/", getAllFeedbacks); // Admin and public view
router.get("/user/:userId", confirmUser, getUserFeedbacks); // Specific user

export default router;

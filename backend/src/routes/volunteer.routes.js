import express from "express";
import {
  registerVolunteer,
  getAllVolunteers,
  assignEvent,
  deleteVolunteer,
} from "../controllers/volunteer.controller.js";
import { TokenGuard } from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// Public route
router.post("/register", registerVolunteer);

// Admin-protected routes
router.get("/", TokenGuard, adminMiddleware, getAllVolunteers);
router.post("/assign", TokenGuard, adminMiddleware, assignEvent);
router.delete("/:id", TokenGuard, adminMiddleware, deleteVolunteer);

export default router;

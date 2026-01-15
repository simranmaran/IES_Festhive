import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import {
  adminSignup,
  adminLogin,
  getAllUsers,
  getAllContacts,
  getAllVolunteers,
  getAllEvents,
} from "../controllers/admin.controller.js";

import { TokenGuard } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔹 Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auth Routes
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// Protected Routes
router.get("/users", TokenGuard, getAllUsers);
router.get("/contacts", TokenGuard, getAllContacts);
router.get("/volunteers", TokenGuard, getAllVolunteers);
router.get("/events", TokenGuard, getAllEvents);

export default router;

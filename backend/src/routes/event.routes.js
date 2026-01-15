// src/routes/event.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
} from "../controllers/event.controller.js";
import { TokenGuard } from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import imageupload from "../controllers/imageupload.js"
import upload from "../middleware/upload.js"

const router = express.Router();



// Public route
router.get("/", getAllEvents);

// Admin Protected Routes
router.post("/create", TokenGuard,  createEvent);
router.put("/edit/:id", TokenGuard, adminMiddleware, updateEvent);
router.delete("/delete/:id", TokenGuard, adminMiddleware, deleteEvent);



// Upload image (admin protected)
router.post(
  "/upload-event-image", upload.single('image'), imageupload
);



export default router;

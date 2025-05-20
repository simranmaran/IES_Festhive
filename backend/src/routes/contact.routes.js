import express from "express";
import { submitContactForm } from "../controllers/contact.controller.js";
import { getAllContacts } from "../controllers/contact.controller.js";
const router = express.Router();

// ✅ Route to Submit Contact Form
router.post("/submit", submitContactForm);

// ✅ Route to Get All Contacts (Admin Only)
router.get("/all", getAllContacts);

export default router;

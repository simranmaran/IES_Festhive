import express from 'express'

import profileController from '../controllers/profile.controller.js';
import upload from '../middleware/upload.js'

const router = express.Router();

router.get('/profile', profileController.getUserProfile);
router.put('/profile', profileController.editUserProfile)

router.post("/upload-profile-image",  upload.single("profileImage"), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({ imageUrl: req.file.path });
});

export default router;
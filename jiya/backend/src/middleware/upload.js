import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import cloudinary from "../config/cloudinary.js";

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "festHive/events", // This will create a folder in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    transformation: [{ width: 1000, crop: "limit" }], // Optional: resize images before upload
    public_id: (req, file) => {
      const filename = file.originalname.split(".")[0];
      return `event-${Date.now()}-${filename}`;
    },
  },
});

// File filter function to accept only images
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer with Cloudinary storage
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

export default upload;
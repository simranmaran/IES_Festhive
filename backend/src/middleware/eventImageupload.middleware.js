
import multer from 'multer';
import path from 'path';

// Configure storage
const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, 'uploads/'); // Make sure this directory exists
},
filename: function (req, file, cb) {
cb(null, `${Date.now()}-${file.originalname}`);
}
});

// File filter function to accept only images
const fileFilter = (req, file, cb) => {
const allowedFileTypes =['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const ext = path.extname(file.originalname).toLowerCase();

if (allowedFileTypes.includes(ext)) {
cb(null, true);
} else {
cb(new Error('Only image files are allowed!'), false);
}
};

// Initialize multer with the configuration
const upload = multer({
storage: storage,
fileFilter: fileFilter,
limits: {
fileSize: 5 * 1024 * 1024 // 5MB max file size
}
});

export default upload;

// src/controllers/imageupload.js
const imageUpload = async (req, res) => {
    try {
      // With Cloudinary storage, the file details are available in req.file
      if (!req.file) {
        return res.status(400).json({ 
          success: false, 
          message: "No image file was uploaded" 
        });
      }
  
      // Cloudinary automatically uploads the file and returns the details
      // including the URL in req.file.path
      const imageUrl = req.file.path;
      
      
      // Return the Cloudinary URL to the client
      return res.status(200).json({ 
        success: true, 
        imageUrl: imageUrl,
        message: "Image uploaded successfully" 
      });
      
    } catch (error) {
      console.error("Image upload error:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Image upload failed", 
        error: error.message 
      });
    }
  };
  
  export default imageUpload;
import { profile } from 'console';
import User from '../model/user.model.js'; 
import jwt from 'jsonwebtoken';


const profileController = {

  getUserProfile : async (req, res) => {
 
    try {
      // Get the token from cookies
      const token = req.cookies.jwt;
      
      if (!token) {
        return res.status(401).json({ message: 'Not authenticated, no token found' });
      }
      
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user ID from the decoded token
      const userId = decoded.userID;
      
      // Find the user in database but exclude the password field
      const user = await User.findById(userId).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.setHeader('Content-Type', 'application/json');
      // Return user data
      res.status(200).json(user);
      
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      
      console.error('Profile controller error:', error);

      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ 
        message: 'Server error', 
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      });
    }
  },

  editUserProfile : async (req, res) => {
 
    try {
    
      const token = req.cookies.jwt;
      
      if (!token) {
        return res.status(401).json({ message: 'Not authenticated, no token found' });
      }
      
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user ID from the decoded token
      const userId = decoded.userID;
      const { fullName, email, gender, profilePic } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { fullName, email, gender, profilePic },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
  });
      
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      
      console.error('Profile controller error:', error);

      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ 
        message: 'Server error', 
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      });
    }
  }

}

  export default profileController;



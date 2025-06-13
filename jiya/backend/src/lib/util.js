import jwt from "jsonwebtoken";

export const generateToken = (user, res) => {
  // Create JWT token with user ID
  const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, {
    expiresIn: "4d",
  });

  // Set HTTP-only cookie for security
  res.cookie("jwt", token, {
    maxAge: 4 * 24 * 60 * 60 * 1000,
    httpOnly: true, 
    sameSite: "strict",
    secure: process.env.NODE_MODE !== "development",
  });
  
  // Return user info (excluding sensitive data) to store in localStorage
  return {
    token,
    userInfo: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      // Add any other non-sensitive user data you want to include
      // Do NOT include password or other sensitive information
    }
  };
};

// Helper function to set user in localStorage
export const setUserInLocalStorage = (userInfo) => {
  localStorage.setItem("user", JSON.stringify(userInfo));
};

// Helper function to clear user from localStorage
export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
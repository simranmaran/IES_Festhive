import jwt from "jsonwebtoken";
import admins from "../model/admin.model.js"; 
import User from "../model/user.model.js";







export const TokenGuard = async (req, res, next) => {
    try {
        console.log("Full Request Headers:", req.headers);
        console.log("Cookies:", req.cookies);
        
        const token = req.cookies.jwt;

        if (!token) {
            console.log("No token found");
            return res.status(401).json({ error: "Access Denied: No Token Provided" });
        }

        console.log("Token received:", token);
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        if (!decoded) {
            console.log("Token could not be decoded");
            return res.status(401).json({ error: "Access Denied: Token Expired or Invalid" });
        }
        
        
        const user = await admins.findById(decoded.id).select("-password");
        
        if (!user) {
            console.log("User not found for ID:", decoded.id);
            return res.status(404).json({ error: "User Not Found" });
        }

        console.log("User found:", user);
        req.user = user;
        next();
    } catch (error) {
        console.error("Token Verification Error:", error);
        return res.status(401).json({ error: "Invalid or Expired Token", details: error.message });
    }
};







// export const newTokenGuard = async (req, res, next) => {
//   try {
//       console.log("Headers:", req.headers);
      
//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//           return res.status(401).json({ error: "Access Denied: No Token Provided" });
//       }

//       const token = authHeader.split(" ")[1];
//       console.log("Token received:", token);

//       // Verify Token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded Token Data:", decoded);

//       // Find user using userID
//       const user = await User.findById(decoded.userID).select("-password"); 
//       if (!user) {
//           return res.status(404).json({ error: "User Not Found" });
//       }

//       req.user = user;
//       next();
//   } catch (error) {
//       console.error("Token verification failed:", error.message);
//       return res.status(401).json({ error: "Invalid or Expired Token" });
//   }
// };




export const userLog = (req, res, next) => {
    console.log(
      `Test Request is executed for user 
      ${req.url} with 
      ${req.method} Method at 
      ${new Date().toISOString()}`
    );
  
    next();

   

}
  
export const confirmUser = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies.jwt);
    
    
    const token = req.cookies.jwt;


    

    if (!token) {
        return res.status(401).json({ error: "Access Denied: No Token Provided" });
    }
    console.log("Token Verified");
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ error: "Access Denied: Token Expired or Invalid" });
    }
   
    

    const user = await User.findById(decoded.userID).select("-password");
    if (!user) {
        return res.status(404).json({ error: "User Not Found" });
    }

    req.user = user;
    next();
} catch (error) {
    return res.status(401).json({ error: "Invalid or Expired Token" });
}
  };

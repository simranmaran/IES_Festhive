const adminMiddleware = (req, res, next) => {
    console.log("User Details:", req.user);
    
    if (!req.user) {
        console.log("No user attached to request");
        return res.status(403).json({ error: "No User Attached to Request" });
    }
  
    if (req.user.role !== "admin") {
        console.log("User is not an admin. Current role:", req.user.role);
        return res.status(403).json({ error: "Access Denied. Admins Only!" });
    }
  
    next();
  };
  
  export default adminMiddleware;
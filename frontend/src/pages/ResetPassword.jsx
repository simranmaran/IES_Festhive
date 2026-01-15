import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import {motion} from "framer-motion";
import bgImage from "../assets/reset1.jpg";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  

  const handleResetPassword = async () => {
    if (!newPassword) {
      setMessage("Please enter a new password!");
      return;
    }
  
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/otp/reset-password", 
        { email, newPassword }, // ✅ OTP remove kiya
        { withCredentials: true }
      );
  
      localStorage.removeItem("resetEmail");
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password");
    }
    setLoading(false);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <motion.div className="relative z-10 backdrop-blur-lg bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-md border border-white/30"
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Reset Password</h2>
        {message && <p className="text-white text-center mb-2">{message}</p>}
        
        <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-white mb-4 focus:ring-2 focus:ring-white outline-none" />
        
        <motion.button onClick={handleResetPassword} className="w-full p-3 rounded-lg text-white hover:opacity-90 transition-all duration-300"
          style={{ backgroundColor: "#FF5733" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

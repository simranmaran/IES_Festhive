import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../api/axios"
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      alert(response.data.message);
      navigate("/dashboard"); // Redirect on success
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
     <div className='fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? bg-black'>

<Header />
</div>
    <div className="min-h-[75%] flex items-center justify-center p-13 mt-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-[#A0522D]"
      >
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-700 text-center mb-6">
          Admin Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-[#5c4033] font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-[#c4a484] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>
          <div>
            <label className="block text-[#5c4033] font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#c4a484] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>c
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full  bg-gradient-to-r from-purple-600 to-yellow-700 text-white py-2 rounded-lg hover:bg-opacity-90 transition"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
    <div className='left-0 w-full z-50 transition-all duration-300 bg-black '>


    <Footer />
    </div>
    </>
  );
};

export default AdminLogin;

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import bgImage from "../assets/contact.jpg"


export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/contact/submit", formData);
      setStatus(res.data.message);
      setFormData({ fullName: "", email: "", message: "" });
    } catch (error) {
      setStatus("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* ✅ Semi-Transparent Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* ✅ Contact Form */}
      <motion.div
        className="relative z-10 backdrop-blur-lg bg-white/20 p-8 rounded-xl shadow-lg w-full max-w-md border border-white/30"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold mb-6 text-white text-center drop-shadow-lg">
          Contact Us
        </h1>

        <motion.form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full p-3 mb-4 border border-white/40 rounded-lg bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-white outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full p-3 mb-4 border border-white/40 rounded-lg bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-white outline-none"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full p-3 mb-4 border border-white/40 rounded-lg bg-white/30 text-white placeholder-white focus:ring-2 focus:ring-white outline-none"
          />

          {/* ✅ Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-white/30 p-3 rounded-lg hover:bg-white/50 transition-all duration-300 font-bold text-white shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>

          {/* ✅ Status Message */}
          {status && (
            <motion.p
              className="mt-4 text-white text-center font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {status}
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </motion.div>
  
    
    </div>
  );
}

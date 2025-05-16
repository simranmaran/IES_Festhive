import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import bgImage from "../assets/contact.jpg";

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
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center justify-center min-h-screen w-full"
        style={{ 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundAttachment: "fixed" 
        }}
      >
        {/* Semi-Transparent Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Contact Form Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto">
          <motion.div
            className="backdrop-blur-lg bg-white/20 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-xl 
                      border border-white/30 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-white text-center drop-shadow-lg">
              Contact Us
            </h1>

            <motion.form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
              <div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full p-2 sm:p-3 md:p-4 border border-white/40 rounded-lg bg-white/30 
                           text-white placeholder-white/80 focus:ring-2 focus:ring-white/80 
                           outline-none text-sm sm:text-base"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full p-2 sm:p-3 md:p-4 border border-white/40 rounded-lg bg-white/30 
                           text-white placeholder-white/80 focus:ring-2 focus:ring-white/80 
                           outline-none text-sm sm:text-base"
                />
              </div>
              
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className="w-full p-2 sm:p-3 md:p-4 border border-white/40 rounded-lg bg-white/30 
                           text-white placeholder-white/80 focus:ring-2 focus:ring-white/80 
                           outline-none text-sm sm:text-base"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-white/30 hover:bg-white/50 p-2 sm:p-3 md:p-4 rounded-lg 
                         transition-all duration-300 font-bold text-white shadow-md text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              {/* Status Message */}
              {status && (
                <motion.div
                  className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-white/20 text-white text-center font-medium text-sm sm:text-base"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {status}
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
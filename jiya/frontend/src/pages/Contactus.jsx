import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Clear success message after 5 seconds
  useEffect(() => {
    let timer;
    if (status && status.includes("successfully")) {
      timer = setTimeout(() => {
        setStatus("");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/contact/submit", formData);
      setStatus(res.data.message || "Message sent successfully!");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
      setSubmitted(true);
    } catch (error) {
      setStatus("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: Math.random() * 10 + 10,
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-screen-xl mx-auto">
          {submitted ? (
            <AnimatePresence>
              <motion.div
                className="bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 max-w-lg mx-auto text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
                <p className="text-white/90 text-lg mb-6">
                  Your message has been received. We'll get back to you as soon as possible.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/30 hover:bg-white/40 text-white font-medium rounded-lg transition-all duration-300"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-xl 
                        border border-white/30 max-w-lg mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-8">
                <motion.h1 
                  className="text-4xl md:text-5xl font-extrabold mb-3 text-white text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Get In Touch
                </motion.h1>
                <motion.p 
                  className="text-white/80 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  We'd love to hear from you
                </motion.p>
              </div>

              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {/* Full Name Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full p-4 border ${
                      errors.fullName ? "border-red-400" : "border-white/40"
                    } rounded-lg bg-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-white/80 
                             outline-none text-base transition-all duration-300`}
                    placeholder="Enter your name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-300">{errors.fullName}</p>
                  )}
                </div>
                
                {/* Email Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-4 border ${
                      errors.email ? "border-red-400" : "border-white/40"
                    } rounded-lg bg-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-white/80 
                             outline-none text-base transition-all duration-300`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-300">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2" htmlFor="subject">
                    Subject (Optional)
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 border border-white/40 rounded-lg bg-white/30 
                             text-white placeholder-white/60 focus:ring-2 focus:ring-white/80 
                             outline-none text-base transition-all duration-300"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                {/* Message Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-4 border ${
                      errors.message ? "border-red-400" : "border-white/40"
                    } rounded-lg bg-white/30 text-white placeholder-white/60 focus:ring-2 focus:ring-white/80 
                             outline-none text-base transition-all duration-300`}
                    rows={5}
                    placeholder="Tell us what you'd like to discuss"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-300">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                           p-4 rounded-lg transition-all duration-300 font-bold text-white shadow-lg text-base"
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)" }}
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
                <AnimatePresence>
                  {status && (
                    <motion.div
                      className={`p-3 rounded-lg ${
                        status.includes("Error") ? "bg-red-500/60" : "bg-green-500/60"
                      } text-white text-center font-medium`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {status}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Contact Info */}
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8 text-center text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
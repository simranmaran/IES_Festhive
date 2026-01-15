import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "../api/axios";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
  const validateMobile = (mobile) => /^[0-9]{10}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Password must be at least 6 characters, include 1 uppercase, 1 lowercase, and 1 number");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validateMobile(formData.mobile)) {
      toast.error("Invalid mobile number");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("You must agree to the Terms and Conditions");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("Signup Successful", res.data);
      toast.success("Signup Successful!");
      navigate("/");
    } catch (err) {
      console.error("Signup Failed", err.response?.data);
      toast.error("Signup Unsuccessful!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-[#d2a679]"
      >
        <h2 className="text-2xl font-semibold text-center text-[#5c4033] mb-6">
          Join <span className="text-[#d2a679]">SynVilla</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />

          <select
            name="gender"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onMouseEnter={() => setShowPassword(true)}
              onMouseLeave={() => setShowPassword(false)}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onMouseEnter={() => setShowConfirmPassword(true)}
              onMouseLeave={() => setShowConfirmPassword(false)}
            >
              {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              onChange={handleChange}
              className="mr-2"
            />
            <label>
              I agree to the {" "}
              <Link to="/terms" className="text-[#d2a679] hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#d2a679] text-white py-2 rounded-lg hover:bg-[#c4a484] transition"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-[#5c4033] mt-4">
          Already have an account? {" "}
          <Link to="/login" className="text-[#d2a679] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SignupPage;

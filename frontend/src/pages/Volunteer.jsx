
import React, { useState } from "react";

const RegisterVolunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulating API call since we can't use axios here
      console.log("Submitting data:", formData);
      setMessage("Registration successful! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">Register as Volunteer</h2>
        
        {message && (
          <div className="mb-4 text-sm sm:text-base text-green-600 font-medium p-2 bg-green-50 rounded-lg">
            {message}
          </div>
        )}
        
        {error && (
          <div className="mb-4 text-sm sm:text-base text-red-500 font-medium p-2 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-sm sm:text-base"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-sm sm:text-base"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm sm:text-base mb-1">Phone (optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400 text-sm sm:text-base"
              placeholder="Enter your phone number"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition duration-200 text-sm sm:text-base font-medium mt-2 sm:mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVolunteer;

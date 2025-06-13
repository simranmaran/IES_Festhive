
import React, { useState } from 'react';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    enrollment: '',
    college: '',
    branch: '',
    year: '',
    eventName: '',
    hearAbout: '',
    experience: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (!formData.consent) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    console.log('Form Submitted:', formData);
    alert('Registration submitted successfully!');
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      enrollment: '',
      college: '',
      branch: '',
      year: '',
      eventName: '',
      hearAbout: '',
      experience: '',
      consent: false,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 text-center">Event Registration Form</h2>
      
      <div className="space-y-4">
        {/* Form sections with responsive layout */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="fullName"
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Enter your full name" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="your.email@example.com" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="Your phone number" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                id="gender"
                name="gender" 
                value={formData.gender} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input 
                type="date" 
                id="dob"
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Educational Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="enrollment" className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
              <input 
                type="text" 
                id="enrollment"
                name="enrollment" 
                value={formData.enrollment} 
                onChange={handleChange} 
                placeholder="Your enrollment number" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">College/University</label>
              <input 
                type="text" 
                id="college"
                name="college" 
                value={formData.college} 
                onChange={handleChange} 
                placeholder="Your institution name" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch/Department</label>
              <input 
                type="text" 
                id="branch"
                name="branch" 
                value={formData.branch} 
                onChange={handleChange} 
                placeholder="Your field of study" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
              <input 
                type="text" 
                id="year"
                name="year" 
                value={formData.year} 
                onChange={handleChange} 
                placeholder="Current year" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Event Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
              <input 
                type="text" 
                id="eventName"
                name="eventName" 
                value={formData.eventName} 
                onChange={handleChange} 
                placeholder="Name of the event" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div>
              <label htmlFor="hearAbout" className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
              <input 
                type="text" 
                id="hearAbout"
                name="hearAbout" 
                value={formData.hearAbout} 
                onChange={handleChange} 
                placeholder="Social media, friends, etc." 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Prior Experience</label>
              <textarea 
                id="experience"
                name="experience" 
                value={formData.experience} 
                onChange={handleChange} 
                placeholder="Share any relevant experience you have" 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32" 
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input 
              type="checkbox" 
              name="consent" 
              checked={formData.consent} 
              onChange={handleChange} 
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
            />
            <span className="ml-2 text-sm text-gray-700">I agree to the terms and conditions</span>
          </label>
        </div>

        {/* Form buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button 
            onClick={handleSubmit} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
          <button 
            onClick={handleReset} 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
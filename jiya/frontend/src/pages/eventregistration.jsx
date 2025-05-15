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
    category: '',
    session: '',
    hearAbout: '',
    experience: '',
    consent: false,
    idCard: null,
    resume: null,
    certificate: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      category: '',
      session: '',
      hearAbout: '',
      experience: '',
      consent: false,
      idCard: null,
      resume: null,
      certificate: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Event Registration Form</h2>
      <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4">
        {/* Personal Info */}
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full p-2 border rounded" required />
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" required />
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" />

        {/* Educational Details */}
        <input type="text" name="enrollment" value={formData.enrollment} onChange={handleChange} placeholder="Enrollment Number" className="w-full p-2 border rounded" required />
        <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College/University Name" className="w-full p-2 border rounded" required />
        <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch/Department" className="w-full p-2 border rounded" required />
        <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year of Study" className="w-full p-2 border rounded" required />

        {/* Event Details */}
        <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Event Name" className="w-full p-2 border rounded" />
       

        {/* Other Fields */}
        <input type="text" name="hearAbout" value={formData.hearAbout} onChange={handleChange} placeholder="How did you hear about the event?" className="w-full p-2 border rounded" />
        <textarea name="experience" value={formData.experience} onChange={handleChange} placeholder="Any prior experience" className="w-full p-2 border rounded" />

        <label className="block text-sm">
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mr-2" />
          I agree to the terms and conditions
        </label>

        {/* Buttons */}
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
          <button type="reset" className="bg-gray-300 text-black px-4 py-2 rounded">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default EventRegistrationForm;

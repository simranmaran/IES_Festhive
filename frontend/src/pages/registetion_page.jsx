import React, { useState } from "react";
// import Footer from "./footer"; // Make sure this file exists

const EventRegistrationPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    courseYear: "",
    event: "",
    teamName: "",
    agree: false,
  });

  const [phoneError, setPhoneError] = useState(" ");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

      if (name === "phone") {
    if (value.length === 10) {
      setPhoneError(""); // valid
    } else {
      setPhoneError("Invalid number"); // invalid
    }
  }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert("Please accept the Terms & Conditions.");
      return;
    }
    console.log("Form submitted:", form);
    alert("Registration Successful!");
    // Optional: API call or further processing
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 p-6 relative">


      
      <div className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-2xl text-white">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-fuchsia-400 mb-8">
          College Event Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              placeholder="your name"
             className="w-full px-4 py-3 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="your@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Phone Number */}
         <div>
             <label className="block text-sm font-medium mb-1">Phone Number</label>
             <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              maxLength={10}
              placeholder="Enter 10-digit number"
              className="w-full px-4 py-3 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
           {phoneError && (
           <p className="text-red-500 text-sm mt-1">{phoneError}</p>
           )}
        </div>


          {/* College Name */}
          <div>
            <label className="block text-sm font-medium mb-1">College/University</label>
            <input
              type="text"
              name="college"
              value={form.college}
              onChange={handleChange}
              required
              placeholder="IES University Bhopal"
              className="w-full px-4 py-3 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Course & Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Course & Year</label>
            <input
              type="text"
              name="courseYear"
              value={form.courseYear}
              onChange={handleChange}
              required
              placeholder="B.Tech CSE, 3rd Year"
              
              className="w-full px-4 py-3 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Event Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Event</label>
            <select
              name="event"
              value={form.event}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">-- Choose an Event --</option>
              <option value="Coding Competition">Coding Competition</option>
              <option value="Poster Presentation">Poster Presentation</option>
              <option value="Dance Battle">Dance Battle</option>
              <option value="Quiz Mania">Quiz Mania</option>
            </select>
          </div>

          {/* Team Name (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">Team Name (if any)</label>
            <input
              type="text"
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
              placeholder="Tech Ninjas"
          className="w-full px-4 py-3 rounded-xl bg-white text-black border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <label className="text-sm">
              I agree to the{" "}
              <span className="underline text-pink-300 cursor-pointer">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-500 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-105"
            >
              Register Now
            </button>
          </div>
        </form>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default EventRegistrationPage;

import React, { useState } from "react";
import { ThumbsUp, Star, User, Mail } from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    comments: "",
    suggestions: "",
  });

  const [message, setMessage] = useState(""); // New state for success/failure message
  const [messageType, setMessageType] = useState("success"); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save feedback to Firestore
      await addDoc(collection(db, "feedbacks"), {
        ...formData,
        timestamp: Timestamp.now(),
      });

      // Display success message
      setMessage("✅ Thanks for your feedback!");
      setMessageType("success");

      // Clear the form
      setFormData({
        name: "",
        email: "",
        rating: "",
        comments: "",
        suggestions: "",
      });
    } catch (error) {
      console.error("Error submitting feedback: ", error);
      setMessage("❌ Something went wrong. Please try again.");
      setMessageType("error");
    }
  };

  // Function to render stars dynamically based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(
        <Star
          key={i}
          size={24}
          className={`${
            i < rating ? "text-yellow-400" : "text-gray-400"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 p-6 relative">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-3xl border-4 border-slate-500">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-teal-300 text-transparent bg-clip-text flex justify-center items-center gap-2">
            <ThumbsUp size={32} />
            Share Your Feedback
          </h2>
          <p className="text-sm text-white/80 mt-2">
            Help us make the next event even better!
          </p>
        </div>

        {/* ✅ Show Message Below Header */}
        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-xl text-sm font-semibold ${
              messageType === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <div className="flex items-center gap-3 bg-white/10 border-2 border-slate-500 rounded-xl px-4 py-3">
              <User className="text-teal-300" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-white/60"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center gap-3 bg-white/10 border-2 border-slate-500 rounded-xl px-4 py-3">
              <Mail className="text-pink-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none placeholder-white/60"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm mb-1">Rate the Event</label>
            <div className="flex items-center gap-3 bg-white/10 border-2 border-slate-500 rounded-xl px-4 py-3">
              <Star className="text-yellow-400" />
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-transparent text-white outline-none"
                required
              >
                <option value="">-- Select Rating --</option>
                <option className="bg-gray-900" value="1">
                  1 - Poor
                </option>
                <option className="bg-gray-900" value="2">
                  2 - Fair
                </option>
                <option className="bg-gray-900" value="3">
                  3 - Good
                </option>
                <option className="bg-gray-900" value="4">
                  4 - Very Good
                </option>
                <option className="bg-gray-900" value="5">
                  5 - Excellent
                </option>
              </select>
            </div>
            {/* Render stars based on rating */}
            {formData.rating && (
              <div className="mt-2 flex">{renderStars(Number(formData.rating))}</div>
            )}
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm mb-1">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full bg-white/10 border-2 border-slate-500 rounded-xl px-4 py-3 placeholder-white/60 outline-none resize-none"
              placeholder="What did you enjoy the most?"
              rows="3"
              required
            />
          </div>

          {/* Suggestions */}
          <div>
            <label className="block text-sm mb-1">Suggestions</label>
            <textarea
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
              className="w-full bg-white/10 border-2 border-slate-500 rounded-xl px-4 py-3 placeholder-white/60 outline-none resize-none"
              placeholder="What can we improve?"
              rows="3"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 transition duration-300 font-bold rounded-xl shadow-md"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;


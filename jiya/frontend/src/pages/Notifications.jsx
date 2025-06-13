import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      title: "🎉 Welcome",
      message: "Thanks for joining the event! Stay tuned.",
      time: "Just now",
    },
    {
      title: "⏰ Reminder",
      message: "Opening ceremony at 9 AM tomorrow.",
      time: "2 hours ago",
    },
  ]);

  const handleSendNotification = (e) => {
    e.preventDefault();
    const title = e.target.title.value.trim();
    const message = e.target.message.value.trim();
    if (!title || !message) {
      toast.error("Both fields are required");
      return;
    }

    const newNote = { title, message, time: "Just now" };
    setNotifications([newNote, ...notifications]);
    toast.success("Notification sent!");
    e.target.reset();
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 p-6 relative">

      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
        🔔 Notifications
      </h1>
      <p className="text-purple-300 mb-12 text-center">
        Real-time alerts and updates
      </p>

      {/* Notification Feed */}
      <div className="w-full max-w-4xl space-y-6 mb-16">
        {notifications.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="backdrop-blur-md bg-white/5 border border-purple-600/30 rounded-xl p-6 shadow-lg hover:shadow-purple-600/40 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-purple-300 font-semibold">
                {note.title}
              </h2>
              <span className="text-sm text-gray-400">{note.time}</span>
            </div>
            <p className="text-gray-200 mt-2">{note.message}</p>
          </motion.div>
        ))}
      </div>

      {/* Notification Input Form */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-purple-700/40"
      >
        <h2 className="text-2xl font-bold text-purple-300 mb-6 text-center">
          📨 Send a Notification
        </h2>
        <form onSubmit={handleSendNotification} className="space-y-5">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Message"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105"
          >
            ➕ Send Notification
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default NotificationsPage;

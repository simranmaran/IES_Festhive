import React, { useState } from "react";
import { CalendarDays, MapPin, Clock, PlusCircle } from "lucide-react";

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([
    { date: "2025-05-11", time: "09:00 AM", event: "Opening Ceremony", location: "Main Hall" },
    { date: "2025-05-11", time: "10:00 AM", event: "Guest Speaker", location: "Auditorium" },
    { date: "2025-05-11", time: "12:00 PM", event: "Networking Lunch", location: "Cafeteria" },
    { date: "2025-05-11", time: "02:00 PM", event: "Panel Discussion", location: "Conference Room" },
    { date: "2025-05-11", time: "04:00 PM", event: "Closing Remarks", location: "Main Hall" },
  ]);

  const [newEvent, setNewEvent] = useState({
    event: "",
    location: "",
    date: "",
    time: "",
  });

  const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  };

  const isValidTime = (timeStr) => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i;
    return timeRegex.test(timeStr);
  };

  const isValidText = (text) => {
    return /^[a-zA-Z0-9 .,'-]+$/.test(text.trim()) && text.trim().length > 0;
  };

  const handleAddEvent = () => {
    const { event, date, location, time } = newEvent;

    if (!isValidText(event)) {
      alert("Invalid input: Event must contain only valid text.");
      return;
    }

    if (!isValidDate(date)) {
      alert("Invalid input: Date must be a valid date.");
      return;
    }

    if (!isValidText(location)) {
      alert("Invalid input: Location must contain only valid text.");
      return;
    }

    if (!isValidTime(time)) {
      alert("Invalid input: Time must be in HH:MM AM/PM format.");
      return;
    }

    setSchedule([...schedule, newEvent]);
    setNewEvent({ event: "", location: "", date: "", time: "" });
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-start bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 p-6 relative">
      <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
        📅 Event Schedule
      </h1>

      {/* Add Event Form */}
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <PlusCircle className="w-6 h-6 mr-2 text-green-400" /> Add New Event
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            className="p-2 rounded-lg bg-white/20 text-white placeholder-white"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Time (e.g., 03:00 PM)"
            className="p-2 rounded-lg bg-white/20 text-white placeholder-white"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <input
            type="text"
            placeholder="Event Name"
            className="p-2 rounded-lg bg-white/20 text-white placeholder-white"
            value={newEvent.event}
            onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            className="p-2 rounded-lg bg-white/20 text-white placeholder-white"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          />
        </div>
        <button
          onClick={handleAddEvent}
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition"
        >
          Add Event
        </button>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {/* Event Name First */}
            <div className="flex items-center mb-3">
              <p className="text-xl font-semibold text-white">{item.event}</p>
            </div>
            
            {/* Date Second */}
            <div className="flex items-center mb-3">
              <CalendarDays className="text-yellow-300 mr-3" />
              <p className="text-base text-white">{item.date}</p>
            </div>

            {/* Location Third */}
            <div className="flex items-center mb-2">
              <MapPin className="text-blue-300 mr-3" />
              <p className="text-base text-white">{item.location}</p>
            </div>

            {/* Time Fourth */}
            <div className="flex items-center mb-2">
              <Clock className="text-pink-400 mr-3" />
              <p className="text-lg font-medium text-white">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
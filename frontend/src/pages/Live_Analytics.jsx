import React, { useState } from 'react';

const initialEvents = [
  {
    title: 'Coding Competition',
    date: '2025-05-20',
    time: '10:00 AM - 12:00 PM',
    location: 'Auditorium A',
    status: 'Upcoming',
    participants: 100,
    checkedIn: 0,
  },
  {
    title: 'Dance Battle',
    date: '2025-05-21',
    time: '03:00 PM - 05:00 PM',
    location: 'Main Stage',
    status: 'Live',
    participants: 150,
    checkedIn: 120,
  },
  {
    title: 'Quiz Mania',
    date: '2025-05-21',
    time: '05:30 PM - 06:30 PM',
    location: 'Room 204',
    status: 'Completed',
    participants: 60,
    checkedIn: 58,
  },
];

const statusColors = {
  Upcoming: 'bg-blue-500',
  Live: 'bg-green-500',
  Completed: 'bg-gray-500',
};

const Live_Analytics = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    participants: 0,
    checkedIn: 0,
    status: 'Upcoming',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: name === 'participants' || name === 'checkedIn' ? parseInt(value) : value,
    }));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.participants > 0) {
      setEvents([...events, newEvent]);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        participants: 0,
        checkedIn: 0,
        status: 'Upcoming',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-indigo-900 to-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">📊 Live Event Analytics</h2>

      {/* Add Event Form */}
      <div className="bg-white text-black p-6 rounded-xl mb-10 max-w-4xl mx-auto shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center">➕ Add New Event</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {['title', 'date', 'time', 'location'].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newEvent[field]}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          ))}
          <input
            type="number"
            name="participants"
            placeholder="Participants"
            value={newEvent.participants}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleAddEvent}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Event Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {events.map((event, index) => {
          const checkInRate = event.participants
            ? Math.round((event.checkedIn / event.participants) * 100)
            : 0;

          return (
            <div
              key={index}
              className="p-5 bg-white text-black rounded-xl shadow-md hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <span
                  className={`text-xs text-white px-3 py-1 rounded-full ${statusColors[event.status]}`}
                >
                  {event.status}
                </span>
              </div>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>

              {(event.status === 'Live' || event.status === 'Completed') && (
                <div className="mt-4">
                  <p><strong>Participants:</strong> {event.participants}</p>
                  <p><strong>Checked In:</strong> {event.checkedIn}</p>
                  <p><strong>Check-in Rate:</strong> {checkInRate}%</p>
                  <div className="w-full bg-gray-300 h-2 rounded-full mt-2">
                    <div
                      className="h-2 bg-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${checkInRate}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Live_Analytics;




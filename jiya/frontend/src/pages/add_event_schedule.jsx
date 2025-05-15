"use client"

import { useState } from "react"

const AddEventForm = () => {
  const [eventTime, setEventTime] = useState("")
  const [eventName, setEventName] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEvent = {
      time: eventTime,
      name: eventName,
      location: location,
    }

    // Handle your event creation logic here
    console.log("New Event:", newEvent)

    // Reset form fields after submission
    setEventTime("")
    setEventName("")
    setLocation("")
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Add New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Time:</label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-yellow-700 text-white font-medium rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
        >
          Add Event
        </button>
      </form>
    </div>
  )
}

export default AddEventForm

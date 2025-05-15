import React, { useState } from 'react';

const AddEventForm = () => {
  const [eventTime, setEventTime] = useState('');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      time: eventTime,
      name: eventName,
      location: location
    };

    // Handle your event creation logic here
    console.log('New Event:', newEvent);

    // Reset form fields after submission
    setEventTime('');
    setEventName('');
    setLocation('');
  };

  return (
    <div>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Time:</label>
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEventForm;


import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/axios";

const PublicEvents = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        if (res.data && Array.isArray(res.data.events)) {
          setEvents(res.data.events);
        } else {
          setEvents([]); // fallback
        }
      } catch (err) {
        console.error("Error fetching events", err);
        setEvents([]); // fallback
      }
    };
    fetchEvents();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? bg-black'>

<Header />
</div>

    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-15">
      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} className="bg-white p-4 rounded shadow">
            <img
              src={event.image}
              alt={event.title}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-500">
              📅 {new Date(event.date).toLocaleDateString()} | 📍 {event.location}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-gray-600">No events found.</p>
      )}
    </div>
    <div>
      <Footer />
    </div>
    </>
  );
};

export default PublicEvents;

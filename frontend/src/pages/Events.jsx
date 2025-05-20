"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Clock, MapPin, Users, ChevronDown, ChevronUp, Search, Filter } from "lucide-react"
import Header from "../components/Header"

const EventCard = ({ event, expandedId, toggleExpand, handleRegister }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300">
      <div className="relative">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-60 object-cover" />
        <div className="absolute top-0 right-0 m-3">
          <span
            className={`py-1 px-3 rounded-full text-xs font-medium uppercase ${
              event.category === "technology"
                ? "bg-blue-100 text-blue-800"
                : event.category === "cultural"
                  ? "bg-purple-100 text-purple-800"
                  : event.category === "sports"
                    ? "bg-green-100 text-green-800"
                    : event.category === "business"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
            }`}
          >
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h2>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={18} className="mr-2 text-yellow-700" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2 text-yellow-700" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center text-gray-600 col-span-2">
            <MapPin size={18} className="mr-2 text-yellow-700" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Users size={18} className="mr-2 text-yellow-700" />
            <span>Capacity: {event.capacity}</span>
          </div>

          {/* Registration Status */}
          <div className="flex justify-end">
            <div
              className={`py-1 px-3 inline-block rounded-full text-sm font-medium ${event.registrationOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {event.registrationOpen ? "Registration Open" : "Registration Closed"}
            </div>
          </div>
        </div>

        {/* Event Details Toggle Button */}
        <button
          onClick={() => toggleExpand(event.id)}
          className="w-full py-2 flex items-center justify-center text-yellow-700 hover:text-yellow-800 border border-yellow-700 rounded-lg hover:bg-yellow-50 transition"
        >
          {expandedId === event.id ? (
            <>
              Hide Details <ChevronUp size={18} className="ml-1" />
            </>
          ) : (
            <>
              Show Details <ChevronDown size={18} className="ml-1" />
            </>
          )}
        </button>

        {/* Expanded Content */}
        {expandedId === event.id && (
          <div className="mt-4 border-t border-gray-200 pt-4 animate-fadeIn">
            <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-5 bg-yellow-700 rounded mr-2"></span>
                Event Highlights
              </h3>
              <ul className="space-y-2">
                {event.highlights.map((highlight, idx) => (
                  <li key={idx} className="text-gray-700 flex items-start">
                    <div className="w-2 h-2 bg-yellow-700 rounded-full mt-2 mr-2"></div>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Registration Button */}
            {event.registrationOpen ? (
              <button
                onClick={() => handleRegister(event.id)}
                className="w-full py-3 bg-yellow-700 text-white rounded-lg hover:bg-yellow-800 transition font-medium"
              >
                Register Now
              </button>
            ) : (
              <button
                disabled
                className="w-full py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium"
              >
                Registration Closed
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Events = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState("all")
  const [expandedId, setExpandedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Add custom styles
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Simulated events data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          title: "Annual Tech Festival",
          date: "June 10, 2025",
          time: "10:00 AM - 6:00 PM",
          location: "Main Campus Auditorium",
          capacity: 500,
          registrationOpen: true,
          category: "technology",
          description:
            "Join us for our annual technology showcase featuring student projects, industry speakers, and hands-on workshops. This year's theme is 'Innovation for Sustainability' with special emphasis on green technologies.",
          image: "/placeholder.svg?height=400&width=600",
          highlights: [
            "Project exhibition by final year students",
            "Panel discussion with industry experts",
            "Coding competition with prizes worth ₹50,000",
            "Workshop on AI and Machine Learning",
          ],
        },
        {
          id: 2,
          title: "Cultural Night",
          date: "May 25, 2025",
          time: "5:00 PM - 10:00 PM",
          location: "Open Air Theatre",
          capacity: 1000,
          registrationOpen: true,
          category: "cultural",
          description:
            "Experience a vibrant evening filled with music, dance, and theatrical performances by talented students. Traditional and contemporary performances showcasing the rich cultural diversity of our institution.",
          image: "/placeholder.svg?height=400&width=600",
          highlights: ["Classical dance performances", "Band competition", "Fashion show", "Folk music showcase"],
        },
        {
          id: 3,
          title: "Sports Tournament",
          date: "July 5-15, 2025",
          time: "9:00 AM - 5:00 PM",
          location: "College Sports Complex",
          capacity: 300,
          registrationOpen: true,
          category: "sports",
          description:
            "Annual inter-college sports competition featuring various sports including cricket, football, basketball, volleyball, and athletics. Open for all college students with exciting prizes for winners.",
          image: "/placeholder.svg?height=400&width=600",
          highlights: [
            "Cricket Tournament (Men's & Women's)",
            "Football Championship",
            "Basketball Knockout Competition",
            "Athletics Meet",
          ],
        },
        {
          id: 4,
          title: "Entrepreneurship Summit",
          date: "August 12, 2025",
          time: "11:00 AM - 4:00 PM",
          location: "Business School Conference Hall",
          capacity: 250,
          registrationOpen: false,
          category: "business",
          description:
            "Connect with successful entrepreneurs, investors, and business leaders. Learn about the latest trends in startups and get insights on building sustainable businesses in today's competitive environment.",
          image: "/placeholder.svg?height=400&width=600",
          highlights: [
            "Startup pitch competition",
            "Networking session with investors",
            "Business model canvas workshop",
            "Success stories by alumni entrepreneurs",
          ],
        },
        {
          id: 5,
          title: "Science Exhibition",
          date: "September 3, 2025",
          time: "10:00 AM - 3:00 PM",
          location: "Science Block",
          capacity: 400,
          registrationOpen: true,
          category: "academic",
          description:
            "Annual science exhibition showcasing innovative projects by students from various departments. Special focus on renewable energy, biotechnology, and environmental science this year.",
          image: "/placeholder.svg?height=400&width=600",
          highlights: [
            "Research project demonstrations",
            "Interactive science experiments",
            "Guest lectures by renowned scientists",
            "Innovation competition with cash prizes",
          ],
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Filter and search events
  const filteredEvents = events.filter((event) => {
    const matchesFilter = filter === "all" || event.category === filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Toggle event details expansion
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Handle registration
  const handleRegister = (eventId) => {
    navigate(`/registration_page?eventId=${eventId}`)
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-yellow-800">
            IES Festhive Events
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and participate in exciting events happening at our campus
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-500" />
                <span className="text-gray-700">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg transition ${filter === "all" ? "bg-yellow-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("technology")}
                  className={`px-4 py-2 rounded-lg transition ${filter === "technology" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  Technology
                </button>
                <button
                  onClick={() => setFilter("cultural")}
                  className={`px-4 py-2 rounded-lg transition ${filter === "cultural" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  Cultural
                </button>
                <button
                  onClick={() => setFilter("sports")}
                  className={`px-4 py-2 rounded-lg transition ${filter === "sports" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  Sports
                </button>
                <button
                  onClick={() => setFilter("business")}
                  className={`px-4 py-2 rounded-lg transition ${filter === "business" ? "bg-amber-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  Business
                </button>
                <button
                  onClick={() => setFilter("academic")}
                  className={`px-4 py-2 rounded-lg transition ${filter === "academic" ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                >
                  Academic
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-700"></div>
            <p className="mt-4 text-gray-600">Loading exciting events...</p>
          </div>
        )}

        {/* No events message */}
        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md max-w-md mx-auto">
            <div className="text-yellow-700 mb-4">
              <Search size={64} className="mx-auto opacity-70" />
            </div>
            <p className="text-gray-700 text-xl font-medium">No events found</p>
            <p className="text-gray-500 mt-2">Try changing your search or filter settings</p>
          </div>
        )}

        {/* Events Counter */}
        {!loading && filteredEvents.length > 0 && (
          <div className="text-center mb-6">
            <span className="bg-white px-4 py-2 rounded-full text-gray-700 shadow-sm">
              <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? "event" : "events"} found
            </span>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              expandedId={expandedId}
              toggleExpand={toggleExpand}
              handleRegister={handleRegister}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events

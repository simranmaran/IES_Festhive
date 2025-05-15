import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { features } from './features'; // Using the original path from your file

export default function EventDetails() {
  const { id } = useParams();
  const event = features.find(item => item.id.toString() === id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 15,
    hours: 8,
    minutes: 23,
    seconds: 45
  });
  const countdownRef = useRef(null);

  // Event images for gallery slider with AI generated images
  const galleryImages = [
    { url: event?.img || "https://source.unsplash.com/random/800x450/?event", caption: "Main Event Hall" },
    { url: "https://source.unsplash.com/random/800x450/?ceremony", caption: "Opening Ceremony" },
    { url: "https://source.unsplash.com/random/800x450/?presentation", caption: "Speaker Presentation" },
    { url: "https://source.unsplash.com/random/800x450/?audience", caption: "Audience Engagement" },
    { url: "https://source.unsplash.com/random/800x450/?networking", caption: "Networking Session" },
  ];

  // Upcoming events with AI generated images
  const upcomingEvents = [
    { 
      id: 1, 
      title: "Annual Tech Symposium", 
      date: "June 12, 2025", 
      image: "https://source.unsplash.com/random/600x400/?tech" 
    },
    { 
      id: 2, 
      title: "Summer Music Festival", 
      date: "July 3, 2025", 
      image: "https://source.unsplash.com/random/600x400/?music" 
    },
    { 
      id: 3, 
      title: "Leadership Workshop", 
      date: "July 18, 2025", 
      image: "https://source.unsplash.com/random/600x400/?leadership" 
    },
    { 
      id: 4, 
      title: "Alumni Meetup", 
      date: "August 5, 2025", 
      image: "https://source.unsplash.com/random/600x400/?alumni" 
    },
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    // Add page title
    document.title = event ? `${event.title} | College Events` : 'Event Not Found';
    
    // Animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    // Gallery slider auto-rotation
    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    
    // Countdown timer
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(sliderTimer);
      clearInterval(countdownRef.current);
    };
  }, [event, galleryImages.length]);

  // Function to navigate gallery slides
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Next slide function
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  if (!event) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-black text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
      <p className="text-xl mb-8">The event you're looking for doesn't exist or has been removed.</p>
      <Link to="/" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center">
        ← Back to Events
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white overflow-hidden">
      {/* Animated particles background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-yellow-400 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section with Enhanced Parallax Effect */}
      <div className="relative h-screen md:h-screen overflow-hidden">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out ${isLoaded ? 'scale-100 filter-none' : 'scale-110 blur-sm'}`}
          style={{ 
            backgroundImage: `url(${event.img || "https://source.unsplash.com/random/1920x1080/?event"})`,
            transform: isLoaded ? 'scale(1.05)' : 'scale(1.15)', 
            filter: `brightness(${isLoaded ? 0.8 : 0.5})`,
            transition: 'transform 1.5s ease-out, filter 1.5s ease-out',
            objectFit: 'cover',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
        
        {/* Glowing accent borders */}
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 opacity-80" />
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 opacity-80" />
        <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 opacity-80" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
          <Link 
            to="/" 
            className={`text-white mb-auto hover:text-yellow-300 transition flex items-center w-fit px-4 py-2 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
            style={{ transition: 'transform 0.6s ease-out, opacity 0.6s ease-out' }}
          >
            <span className="mr-2">←</span> Back to Events
          </Link>
          <div className={`mt-auto transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transition: 'transform 0.8s ease-out, opacity 0.8s ease-out', transitionDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white">{event.title}</h1>
            <p className="text-xl md:text-2xl text-yellow-200 max-w-3xl drop-shadow-md leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className={`lg:col-span-2 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transition: 'transform 0.8s ease-out, opacity 0.8s ease-out', transitionDelay: '0.4s' }}>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl mb-8 border border-white/10 hover:border-yellow-400/50 transition-colors duration-300">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-300 border-b border-yellow-500/50 pb-2">About The Event</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-line text-gray-200">{event.r}</p>
              </div>
            </div>

            {/* Enhanced Gallery Section with Image Slider */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-2xl border border-white/10 hover:border-yellow-400/50 transition-colors duration-500 mb-8">
              <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-300 border-b border-yellow-500/50 pb-2">Event Gallery</h2>
              
              {/* Image Slider */}
              <div className="relative rounded-xl bg-gray-700/50 transition-all duration-500 shadow-xl hover:shadow-yellow-500/30 group overflow-hidden mb-4">
                <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio container */}
                  {galleryImages.map((image, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      <img 
                        src={image.url} 
                        alt={`Event gallery image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                        <p className="p-4 text-white text-lg font-medium">{image.caption}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Navigation Arrows */}
                  <button 
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Previous slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 rounded-full p-2 text-white opacity-70 hover:opacity-100 transition-opacity"
                    aria-label="Next slide"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center space-x-2 mt-4">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-yellow-500 w-6' : 'bg-gray-400/50 hover:bg-gray-300/70'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={`lg:col-span-1 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transition: 'transform 0.8s ease-out, opacity 0.8s ease-out', transitionDelay: '0.6s' }}>
            {/* Event Details Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl mb-8 sticky top-8 border border-white/10 hover:border-yellow-400/50 transition-colors duration-500">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-300 border-b border-yellow-500/50 pb-2">Event Details</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                  <div className="text-yellow-400 text-2xl mr-4 p-3 bg-yellow-400/20 rounded-lg">📅</div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 text-lg">Date & Time</h4>
                    <p className="text-gray-300">March 15, 2025 • 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                  <div className="text-yellow-400 text-2xl mr-4 p-3 bg-yellow-400/20 rounded-lg">📍</div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 text-lg">Location</h4>
                    <p className="text-gray-300">College Main Auditorium</p>
                    <p className="text-sm text-gray-400">Block A, North Campus</p>
                  </div>
                </div>
                
                <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                  <div className="text-yellow-400 text-2xl mr-4 p-3 bg-yellow-400/20 rounded-lg">👥</div>
                  <div>
                    <h4 className="font-semibold text-yellow-200 text-lg">Organizers</h4>
                    <p className="text-gray-300">Cultural Committee</p>
                    <p className="text-sm text-gray-400">Contact: events@college.edu</p>
                  </div>
                </div>
              </div>
              
              {/* Register Now button removed */}
            </div>
            
            {/* Updated Featured Speakers with AI profile images */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl mb-8 border border-white/10 hover:border-yellow-400/50 transition-colors duration-500">
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-300 border-b border-yellow-500/50 pb-2">Featured Speakers</h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex-shrink-0 overflow-hidden">
                    <img src="https://source.unsplash.com/random/100x100/?portrait,man" alt="Ravi Kumar" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-yellow-200">Ravi Kumar</h4>
                    <p className="text-sm text-gray-400">Event Director</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex-shrink-0 overflow-hidden">
                    <img src="https://source.unsplash.com/random/100x100/?portrait,woman" alt="Sophia Patel" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-yellow-200">Sophia Patel</h4>
                    <p className="text-sm text-gray-400">Distinguished Speaker</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex-shrink-0 overflow-hidden">
                    <img src="https://source.unsplash.com/random/100x100/?portrait" alt="Michael Tran" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-yellow-200">Michael Tran</h4>
                    <p className="text-sm text-gray-400">Master of Ceremonies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action with Countdown Timer */}
      <div className="bg-gradient-to-r from-black via-yellow-900 to-black py-16 relative overflow-hidden">
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: `${Math.random() * 100 + 100}px`,
                height: `${Math.random() * 100 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `scale(${Math.random() * 1 + 0.5})`,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white">{event.title}</h2>
          <p className="text-xl md:text-2xl text-yellow-200 mb-8 max-w-3xl mx-auto leading-relaxed">Join hundreds of students in this exciting event and create memories that will last forever!</p>
          
          {/* Countdown timer */}
          <div className="mt-10 grid grid-cols-4 gap-4 max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-white">{countdown.days}</div>
              <div className="text-xs text-yellow-200">DAYS</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-white">{countdown.hours}</div>
              <div className="text-xs text-yellow-200">HOURS</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-white">{countdown.minutes}</div>
              <div className="text-xs text-yellow-200">MINUTES</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 transform hover:scale-105 transition-transform">
              <div className="text-3xl font-bold text-white">{countdown.seconds}</div>
              <div className="text-xs text-yellow-200">SECONDS</div>
            </div>
          </div>
          
          {/* Register Now button removed */}
        </div>
      </div>

      {/* Updated Upcoming Events Section with AI Images */}
      <div className="bg-black/80 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-300">Upcoming Events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((upcomingEvent, index) => (
              <div 
                key={upcomingEvent.id}
                className={`bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-yellow-500/20 border border-white/10 hover:border-yellow-400/30 transition-all duration-500 transform hover:-translate-y-2 opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={upcomingEvent.image} 
                    alt={upcomingEvent.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">{upcomingEvent.date}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-yellow-200 mb-2">{upcomingEvent.title}</h3>
                  <Link to={`/event/${upcomingEvent.id}`} className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center mt-2">
                    View Details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Enhanced with social media icons */}
      <footer className="bg-black/80 backdrop-blur-sm text-gray-400 py-10 border-t border-yellow-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-12 h-12 mr-4 rounded-full overflow-hidden bg-gradient-to-r from-yellow-600 to-yellow-800 p-0.5">
              <div className="bg-black rounded-full w-full h-full flex items-center justify-center">
                <span className="text-yellow-500 text-xl font-bold">IE</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">IES Festhive</h3>
              <p className="text-sm">Creating memorable experiences</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="mb-2">© {new Date().getFullYear()} IES Festhive</p>
            <div className="flex space-x-4 mt-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-600/70 transition-colors cursor-pointer">
                <span>📱</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-600/70 transition-colors cursor-pointer">
                <span>💌</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-600/70 transition-colors cursor-pointer">
                <span>🌐</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 30px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s forwards ease-out;
        }
      `}</style>
    </div>
  );
}
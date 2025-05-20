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
  { url: event?.img || "https://source.unsplash.com/random/800x450/?college-event", caption: "Main Event Highlights" },
  { url: "https://images.pexels.com/photos/16039776/pexels-photo-16039776/free-photo-of-view-of-dancers-performing-on-stage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", caption: "Stage Performance" },
  { url: "https://avsas.ac.in/gallery/images/sportsday24/sportsday-001.webp", caption: "Award Distribution" },
  { url: "https://mediashift.org/wp-content/uploads/2014/12/newsroom_laptops_mizzou-624x381.jpg", caption: "Audience & Students" },
  { url: "https://iesbpl.ac.in/uploads/slider/iescampus.jpg", caption: "Campus Fest Vibes" }
];


  // Upcoming events with AI generated images
  const upcomingEvents = [
    { 
      id: 1, 
      title: "Annual Tech Symposium", 
      date: "June 12, 2025", 
      image: "data:image/jpeg;base64,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" 
    },
    { 
      id: 2, 
      title: "Summer Music Festival", 
      date: "July 3, 2025", 
      image: "https://s3-eu-north-1.amazonaws.com/py3.visitsweden.com/original_images/WayOutWest2-IBSweb.jpg" 
    },
    { 
      id: 3, 
      title: "Leadership Workshop", 
      date: "July 18, 2025", 
      image: "https://unitar.org/sites/default/files/media/image/Leadership%20Skills%20CDT%20Image_1.jpg" 
    },
    { 
      id: 4, 
      title: "Alumni Meetup", 
      date: "August 5, 2025", 
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXX_L2D84kCxvEtTa7KLqXW19W8Rr06ErJaw&s" 
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
                    <img src="data:image/jpeg;base64,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" alt="Ravi Kumar" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-yellow-200">Ravi Kumar</h4>
                    <p className="text-sm text-gray-400">Event Director</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex-shrink-0 overflow-hidden">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/035/832/837/small/ai-generated-beautiful-young-business-woman-portrait-woman-face-smiling-cute-girl-with-long-hair-studio-shot-isolated-on-gray-background-photo.jpg" alt="Sophia Patel" className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-yellow-200">Sophia Patel</h4>
                    <p className="text-sm text-gray-400">Distinguished Speaker</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg hover:bg-white/5 transition duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex-shrink-0 overflow-hidden">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc7sUtJI6xZ2eEUiL12FK2ZF6WvkFNB-AMtg&s" alt="Michael Tran" className="w-full h-full object-cover" />
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
                <div className="relative h-56 overflow-hidden">
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
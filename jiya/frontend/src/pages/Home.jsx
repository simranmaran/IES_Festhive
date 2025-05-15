import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, MapPin, ArrowRight, Icon } from 'lucide-react';
import img from "../assets/college_image.jpg";
import React from 'react';
import Contact from '../pages/Contact';
import uddan from "../assets/uddan.jpg";
import aggaz from "../assets/aggaz.jpg";
import concert from "../assets/concert.jpg";
import INFORI from "../assets/inforia.jpg";
import FEST_O_COM from  "../assets/img1.jpg";
import ATVC from "../assets/atvc.jpg";
import GARBA from "../assets/garba.jpg";
import DJ_NIGHT from "../assets/djnight.jpg";
import UTSAV from "../assets/utsav.jpg";
import Slider from '../pages/Slide';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

 const features = [
  {
    id: "1",
    img: uddan,
    title: "UDAAN 2k25",
    description: "Heart felt celebration honoring the journey and achievements of our graduating seniors. It's a night of memories, gratitude, and a soaring send-off into their next chapter."
  },
  {
    id: "2",
    img: aggaz,
    title: "AGAAZ",
    description: "The vibrant beginning of a new chapter for our juniors. It’s a warm welcome filled with energy, excitement, and unforgettable memories."
  },
  {
    id: "3",
    img: concert,
    title: "LIVE CONCERT",
    description: "The Live Concert was an unforgettable night filled with electrifying performances and energetic vibes. It brought everyone together in a celebration of music, rhythm, and pure excitement."
  },
  {
    id: "4",
    img: INFORI,
    title: "INFORIA",
    description: "Our college’s vibrant fest, celebrating enthusiasm, creativity, and student talent. It’s a grand event filled with fun, competitions, and a showcase of skills and innovation."
  },
  {
    id: "5",
    img: FEST_O_COM,
    title: "FEST-O-COM",
    description: "Lively fresher’s celebration to welcome our newest batch with joy and excitement. It’s a night of music, fun, and bonding that marks the beginning of a beautiful college journey."
  },
  {
    id: "6",
    img: ATVC,
    title: "ATVC",
    description: "Thrilling national-level event where innovation meets engineering excellence in off-road vehicle challenges. It pushes the limits of design, teamwork, and endurance in an intense and competitive environment."
  },
  {
    id: "7",
    img: DJ_NIGHT,
    title: "DJ NIGHT",
    description: "An electrifying night of music and dance that brings the entire campus together to celebrate in rhythm and lights."
  },
  {
    id: "8",
    img: UTSAV,
    title: "UTSAV",
    description: "UTSAV is a cultural extravaganza that showcases the diverse heritage and spirit of celebration through dance, drama, and music."
  },
  {
    id: "9",
    img: GARBA,
    title: "GARBA",
    description: "A traditional night of Garba dance filled with colorful attire, energetic music, and cultural unity under the stars."
  }
];

  
  const stats = [
    { number: '50+', label: 'Events Managed' },
    { number: '5000+', label: 'Student Participants' },
    { number: '30+', label: 'Faculty Members' },
    { number: '12+', label: 'Departments' },
  ];



  
  return (
    <>
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-md' : 'bg-transparent'}`}>

     <Header />
     </div>
  
    <div className="flex flex-col min-h-screen bg-black">
      {/* Navigation */}
      

      {/* Hero Section */}
      <section className="relative pt-16 pb-32 flex content-center items-center justify-center ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-1/2 px-4 mr-auto ml-auto">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  mb-6 text-yellow-600">
                  <span className="block">Welcome to</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-600">
                    IES UNIVERSITY BHOPAL
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-yellow-600 mb-8">
                  Celebrate, Connect, Create - Your College Fest, Simplified!
                </p>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <button className="px-8 py-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition shadow-lg flex items-center justify-center">
                    Explore Event <ChevronRight size={20} className="ml-2" />
                  </button>
                  <button className="px-8 py-4 bg-white text-yellow-600 border border-yellow-600 rounded-md hover:bg-yellow-50 transition shadow-md">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4 mr-auto ml-auto mt-12 md:mt-0">
              <div className="relative">
                <img 
                  src={img}
                  alt="Event management dashboard" 
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black-50">
        <div className="container mx-auto px-4">
          <Slider/>
          
         <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent text-center mt-10 mb-16">
  EVENTS
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature, index) => (
    <div key={index} className="bg-white rounded-lg shadow-md p-4">
      <img src={feature.img} alt={feature.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>

      <div className="flex justify-center mt-6">
        <Link to={`/event/${feature.id}`}>
          <button className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition shadow-md">
            View More
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>

        </div>

        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent mt-20 mb-10">ABOUT IES FESTHIVE</h2>
            <p className="text-xl text-yellow-600 max-w-6xl mx-auto">
            IES FESTHIVE is a comprehensive event management system designed specifically for IES College of Technology, Bhopal, Our platform enables seamless organization, 
            promotion, and participation in college festivals, workshops. seminars, and other events. Whether you're a student looking to discover exciting campus activities
            or an administrator tasked with organizing events, our platform simplifies the entire process from event creation to registration and participation.
            </p>

          {/* //ADD KIYA HAI   */}
          <div className="bg-gradient-to-b from-black-900 to-yellow-900 flex items-center justify-center py-10 mt-20">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 px-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-blue-950 text-white p-6 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105"
          >
            <div className="text-3xl font-bold text-yellow-400">{stat.number}</div>
            <div className="mt-2 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
      </section>

      {/* Testimonials */}
      <section id="features" className="py-20">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-yellow-500 text-transparent bg-clip-text">Powerful Features Built for Event Success</h2>
      <p className="text-xl max-w-3xl mx-auto bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        Discover how our system simplifies event management from start to finish.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-yellow-600">
      {[
        {
             
            icon: "📝",
            title: <Link to="/registration_page">Go to Registration Page</Link>,
            desc: "Allow attendees to register easily with custom forms and instant confirmation.",
          },
        {
            icon: "📊",
            title: <Link to="/Live_Analytics">Live Analytics</Link>,
            desc: "Track registrations, engagement, and attendance in real-time.",
          },
          {
            icon: "📧",
            title:<Link to='/Notifications'>Automated Notifications</Link>,
            desc: "Send timely reminders and updates via email and SMS.",
          },
          {
            icon: "🗓️",
            title:<Link to='/schedule_managment'>Schedule Management</Link>,
            desc: "Create and share event schedules with built-in reminders.",
          },
        // {
        //   icon: "🏛️",
        //   title: "Venue & Resource Booking",
        //   desc: "Reserve locations and manage event logistics efficiently.",
        // },
         {
            icon: "💬",
            title: <Link to="/feedback_page">Feedback Collection</Link>,
            desc: "Gather post-event feedback to continuously improve experiences.",
          },
      ].map((feature, index) => (
        <div key={index} className="bg-black-500 p-6 rounded-xl shadow-md hover:shadow-xl transition border-2 border-yellow-300">
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h4 className="font-bold text-lg mb-2 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">{feature.title}</h4>
          <p className="text-yellow-600 ">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section id="pricing" className="py-20 bg-gradient-to-r from-black-600 to-yellow-900 text-white">
      <Contact />
      </section>

      {/* Footer */}
    <Footer/>
    </div>
   
    </>
  );
}
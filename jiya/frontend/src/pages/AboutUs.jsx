import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Users, 
  Calendar, 
  Globe, 
  School, 
  BookOpen, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Heart,
  Star,
  Sparkles
} from 'lucide-react';

const AboutUs = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [animateSection, setAnimateSection] = useState(null);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Auto-show stats after page load
    const timer = setTimeout(() => {
      setShowStats(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
      setAnimateSection(section);
    }
  };

  const sections = [
    {
      id: 'mission',
      title: 'Our Mission',
      icon: <Award className="text-yellow-600" size={24} />,
      content: 'IES Festhive connects college communities through vibrant cultural and technical festivals. We provide a platform for students to showcase their talents, learn from peers, and create memorable experiences that will last a lifetime.',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'history',
      title: 'Our History',
      icon: <Calendar className="text-blue-600" size={24} />,
      content: 'Founded in 2020, IES Festhive began as a small initiative to connect college festivals across the region. Today, we\'ve grown to support hundreds of events annually, bringing together thousands of students from diverse educational backgrounds.',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'community',
      title: 'Our Community',
      icon: <Users className="text-green-600" size={24} />,
      content: 'Over 50,000 students, 500+ colleges, and countless industry experts make up our thriving community. We foster connections between aspiring talents and established professionals, creating opportunities for mentorship and growth.',
      bgColor: 'bg-green-50'
    },
    {
      id: 'events',
      title: 'Our Events',
      icon: <Globe className="text-purple-600" size={24} />,
      content: 'From technical hackathons to cultural performances, debate competitions to sports tournaments - we host a diverse range of events throughout the academic year. Each event is carefully designed to enhance skills, promote teamwork, and celebrate student achievements.',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'values',
      title: 'Our Values',
      icon: <School className="text-pink-600" size={24} />,
      content: 'Innovation, inclusion, and integrity form the foundation of IES Festhive. We believe in creating equal opportunities for all students regardless of their background, encouraging creative thinking, and maintaining the highest standards of conduct in all our operations.',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'future',
      title: 'Our Future Vision',
      icon: <BookOpen className="text-indigo-600" size={24} />,
      content: 'We aim to become the premier platform for collegiate events nationwide, introducing innovative technologies to enhance event experiences, expanding our scholarship programs, and building stronger industry partnerships to create pathways to professional success for our student community.',
      bgColor: 'bg-indigo-50'
    }
  ];

  const stats = [
    { label: 'Students', value: '50000+', numericValue: 50000, icon: <Users className="text-blue-600" size={24} /> },
    { label: 'Colleges', value: '500+', numericValue: 500, icon: <School className="text-green-600" size={24} /> },
    { label: 'Events', value: '1000+', numericValue: 1000, icon: <Calendar className="text-purple-600" size={24} /> },
    { label: 'States', value: '20+', numericValue: 20, icon: <Globe className="text-red-600" size={24} /> }
  ];

  const testimonials = [
    {
      quote: "IES Festhive helped our college event gain national recognition!",
      author: "Priya Singh",
      role: "Event Coordinator, Delhi Technical University"
    },
    {
      quote: "The platform connected us with amazing sponsors and participants.",
      author: "Rahul Sharma",
      role: "Cultural Secretary, Amity University"
    },
    {
      quote: "Our hackathon participation doubled thanks to IES Festhive's reach.",
      author: "Anjali Patel",
      role: "Tech Lead, BITS Pilani"
    }
  ];

  const CountUp = ({ end, duration = 2000, suffix = "+" }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!showStats) return;
      
      let startTime;
      let animationFrame;
      
      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        if (progress < duration) {
          setCount(Math.floor((progress / duration) * end));
          animationFrame = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };
      
      animationFrame = requestAnimationFrame(updateCount);
      
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, showStats]);
    
    return (
      <span>{count}{suffix}</span>
    );
  };

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen pt-16 pb-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30">
            <Sparkles size={80} className="text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            About IES Festhive
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Connecting college communities through exceptional festivals and events
          </p>
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-full hover:shadow-lg transition duration-300 font-medium flex items-center">
              Explore Our Events <ArrowRight className="ml-2" size={18} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center transform hover:scale-105 transition duration-300">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800">
                  {showStats ? <CountUp end={stat.numericValue} suffix="+" /> : '0+'}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Sections */}
        <div className="max-w-3xl mx-auto">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={`mb-6 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ${expandedSection === section.id ? 'border-yellow-400' : 'border-gray-200'} bg-white`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full px-6 py-4 flex items-center justify-between text-left ${section.bgColor} transition-all duration-300`}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    {section.icon}
                  </div>
                  <span className="text-xl font-medium text-gray-800">{section.title}</span>
                </div>
                {expandedSection === section.id ? 
                  <ChevronUp className="text-gray-700" size={20} /> : 
                  <ChevronDown className="text-gray-700" size={20} />
                }
              </button>
              
              {expandedSection === section.id && (
                <div className="px-6 py-4 bg-white border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">What Colleges Say About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-yellow-400">
                <div className="text-yellow-500 mb-4">
                  <Star size={24} className="fill-current" />
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-yellow-50 p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-yellow-800 mb-4">Join Our Community Today</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Be part of India's largest collegiate festival network and take your events to the next level
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition shadow-md font-medium flex items-center justify-center">
              <Calendar className="mr-2" size={18} />
              Register for Events
            </button>
            <button className="px-6 py-3 border-2 border-yellow-600 text-yellow-700 rounded-md hover:bg-yellow-50 transition shadow-md font-medium flex items-center justify-center">
              <Heart className="mr-2" size={18} />
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;   


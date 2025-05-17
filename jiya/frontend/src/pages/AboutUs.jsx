"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Users, Award, Calendar, MapPin, ChevronDown, ChevronUp, Globe, Heart, Zap, Star } from "lucide-react"

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission")
  const [visibleFaq, setVisibleFaq] = useState(null)
  const [animatedCounter, setAnimatedCounter] = useState({
    events: 0,
    participants: 0,
    years: 0,
    colleges: 0,
  })
  const [isStatsVisible, setIsStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsStatsVisible(true)
          animateCounters()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    const statsElement = statsRef.current
    if (statsElement) observer.observe(statsElement)

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    const targets = {
      events: 50,
      participants: 10000,
      years: 15,
      colleges: 120,
    }

    const duration = 2000 // ms
    const frameRate = 50
    const steps = duration / frameRate
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedCounter({
        events: Math.round(targets.events * progress),
        participants: Math.round(targets.participants * progress),
        years: Math.round(targets.years * progress),
        colleges: Math.round(targets.colleges * progress),
      })

      if (currentStep >= steps) clearInterval(interval)
    }, frameRate)
  }

  const toggleFaq = (index) => {
    setVisibleFaq(visibleFaq === index ? null : index)
  }

  const teamMembers = [
    {
      name: "Ananya Sharma",
      role: "Festival Director",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMy2WByAqJuHbPO6eVXpOE7bu2FkxuZu0oeHhO5VPKJGlFu5HQkn6sZGDtBTw9en7tb5M&usqp=CAU",
      description: "Leading the vision behind IES Festhive since 2020.",
    },
    {
      name: "Rahul Verma",
      role: "Technical Head",
      image: "https://img.freepik.com/free-photo/cheerful-young-caucasian-businessman_171337-727.jpg",
      description: "Bringing technical excellence to all our events.",
    },
    {
      name: "Priya Singh",
      role: "Creative Director",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA6ZY-K-g6Mj9Wn9TC2vFS74rVXTUeT5MFrw&s",
      description: "The creative genius behind our festival themes.",
    },
    {
      name: "Arjun Kumar",
      role: "Marketing Lead",
      image: "https://t4.ftcdn.net/jpg/03/25/73/59/360_F_325735908_TkxHU7okor9CTWHBhkGfdRumONWfIDEb.jpg",
      description: "Spreading the word and building partnerships.",
    },
  ]

  const faqs = [
    {
      question: "How can I participate in IES Festhive?",
      answer:
        "You can register for events through our website by creating an account and signing up for specific events. Registration typically opens 2 months before the festival.",
    },
    {
      question: "Are there any participation fees?",
      answer:
        "Most events have nominal participation fees that vary based on the event type. Some events are free for students from affiliated colleges. Check individual event pages for details.",
    },
    {
      question: "Can I volunteer for IES Festhive?",
      answer:
        "Yes! We welcome volunteers. Visit our 'Join Us' section and fill out the volunteer application form. We have roles in event management, marketing, technical support, and more.",
    },
    {
      question: "Do you provide accommodation for outstation participants?",
      answer:
        "Yes, we provide accommodation at subsidized rates for outstation participants. This needs to be requested during registration and is subject to availability.",
    },
  ]

  const values = [
    {
      icon: <Heart className="w-10 h-10 text-red-500" />,
      title: "Passion",
      description: "We pour our hearts into creating meaningful experiences",
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-500" />,
      title: "Innovation",
      description: "Constantly evolving to bring fresh ideas and experiences",
    },
    {
      icon: <Globe className="w-10 h-10 text-blue-500" />,
      title: "Inclusivity",
      description: "Creating a space where everyone feels welcome and valued",
    },
    {
      icon: <Star className="w-10 h-10 text-purple-500" />,
      title: "Excellence",
      description: "Committing to the highest standards in everything we do",
    },
  ]

  // Animation helper
  const fadeInUpClassName = (delay = 0) =>
    `transform transition duration-700 ease-in-out ${isStatsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${delay ? `delay-${delay}` : ""}`

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-purple-800 to-yellow-600">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1600/500')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        <div className="relative h-full flex items-center justify-center px-4 text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">About IES Festhive</h1>
            <p className="text-xl md:text-2xl text-white opacity-90">
              Celebrating culture, creativity, and innovation since 2010
            </p>
          </div>
        </div>
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-gray-50">
            <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap mb-8 border-b">
            <button
              onClick={() => setActiveTab("mission")}
              className={`px-6 py-3 text-lg font-medium transition-colors duration-300 ${activeTab === "mission" ? "border-b-2 border-yellow-600 text-yellow-600" : "text-gray-600 hover:text-yellow-600"}`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`px-6 py-3 text-lg font-medium transition-colors duration-300 ${activeTab === "vision" ? "border-b-2 border-yellow-600 text-yellow-600" : "text-gray-600 hover:text-yellow-600"}`}
            >
              Our Vision
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 text-lg font-medium transition-colors duration-300 ${activeTab === "history" ? "border-b-2 border-yellow-600 text-yellow-600" : "text-gray-600 hover:text-yellow-600"}`}
            >
              Our History
            </button>
          </div>

          <div className="prose max-w-none">
            {activeTab === "mission" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  At IES Festhive, our mission is to create a vibrant platform where students can showcase their
                  talents, foster innovation, and build lasting connections. We strive to provide an inclusive space
                  that celebrates diversity and encourages cultural exchange among educational institutions across the
                  nation.
                </p>
                <p className="text-lg text-gray-600">
                  Through our diverse range of events spanning technology, arts, culture, and sports, we aim to nurture
                  holistic development and provide experiences that go beyond the classroom, preparing students for the
                  challenges of tomorrow.
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We envision IES Festhive as the premier collegiate festival in India, recognized for its excellence in
                  event curation, participant experience, and social impact. We aspire to be a catalyst for discovering
                  emerging talent and providing a springboard for students to realize their potential.
                </p>
                <p className="text-lg text-gray-600">
                  By 2030, we aim to expand our reach to international participants, fostering global cultural exchange
                  and collaboration while maintaining our core values of inclusivity, innovation, and integrity.
                </p>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our History</h2>
                <p className="text-lg text-gray-600 mb-6">
                  IES Festhive began in 2010 as a small departmental celebration with just 5 events and 200
                  participants. Founded by a group of passionate students who wanted to create opportunities for
                  inter-college interaction, the festival quickly gained popularity for its unique events and welcoming
                  atmosphere.
                </p>
                <p className="text-lg text-gray-600">
                  Over the years, we've grown exponentially, hosting national-level competitions, bringing in celebrity
                  judges, and partnering with industry leaders. From our humble beginnings to becoming one of India's
                  largest collegiate festivals, our journey reflects our commitment to excellence and continuous
                  innovation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at IES Festhive
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 rounded-full bg-gray-50">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div ref={statsRef} className="bg-gradient-to-br from-purple-800 to-purple-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-lg text-purple-200 max-w-2xl mx-auto">
              Making memories and creating opportunities year after year
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className={`${fadeInUpClassName(100)} bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center`}
            >
              <Calendar className="mx-auto mb-4 text-yellow-400 w-12 h-12" />
              <h3 className="text-4xl font-bold text-yellow-400 mb-2">{animatedCounter.events}+</h3>
              <p className="text-white">Events Each Year</p>
            </div>

            <div
              className={`${fadeInUpClassName(200)} bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center`}
            >
              <Users className="mx-auto mb-4 text-yellow-400 w-12 h-12" />
              <h3 className="text-4xl font-bold text-yellow-400 mb-2">{animatedCounter.participants}+</h3>
              <p className="text-white">Annual Participants</p>
            </div>

            <div
              className={`${fadeInUpClassName(300)} bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center`}
            >
              <Award className="mx-auto mb-4 text-yellow-400 w-12 h-12" />
              <h3 className="text-4xl font-bold text-yellow-400 mb-2">{animatedCounter.years}+</h3>
              <p className="text-white">Years of Excellence</p>
            </div>

            <div
              className={`${fadeInUpClassName(400)} bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center`}
            >
              <MapPin className="mx-auto mb-4 text-yellow-400 w-12 h-12" />
              <h3 className="text-4xl font-bold text-yellow-400 mb-2">{animatedCounter.colleges}+</h3>
              <p className="text-white">Participating Colleges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The passionate individuals who make IES Festhive possible year after year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 group"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-yellow-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Everything you need to know about IES Festhive</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-5 text-left hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                  {visibleFaq === index ? (
                    <ChevronUp className="text-yellow-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="text-yellow-600 flex-shrink-0" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    visibleFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-5 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-purple-700 to-yellow-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Experience IES Festhive?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join us for an unforgettable journey of creativity, competition, and celebration.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/Events"
              className="px-8 py-4 bg-white text-yellow-700 rounded-md hover:bg-gray-100 transition shadow-lg"
            >
              Explore Events
            </Link>
            <Link
              to="/signup"
              className="px-8 py-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition shadow-lg"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ChevronDown, ChevronUp, ExternalLink, Calendar, Award, Users, Book, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "@/components/Footer"
import campus1 from "../assets/campus1.jpg"
import campus2 from "../assets/campus2.jpg"
import campus3 from "../assets/campus3.jpg"
import founder from "../assets/founder.jpg"

export default function LearnMore() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const historyTimeline = [
    {
      year: "1995",
      title: "Foundation",
      description: "IES was established with a vision to provide quality education in engineering and technology."
    },
    {
      year: "2000",
      title: "First Major Campus Expansion",
      description: "Added new buildings and facilities to accommodate growing student population."
    },
    {
      year: "2008",
      title: "University Status",
      description: "Granted university status and renamed to IES University."
    },
    {
      year: "2015",
      title: "International Recognition",
      description: "Received international accreditation and established partnerships with global institutions."
    },
    {
      year: "2022",
      title: "Modern Infrastructure Upgrade",
      description: "Completed a major renovation of all facilities with state-of-the-art technology."
    }
  ]

  const departments = [
    {
      name: "Engineering",
      programs: ["Computer Science", "Mechanical", "Civil", "Electrical", "Electronics"]
    },
    {
      name: "Management",
      programs: ["MBA", "BBA", "Executive Management"]
    },
    {
      name: "Sciences",
      programs: ["Physics", "Chemistry", "Mathematics", "Biology"]
    },
    {
      name: "Arts & Humanities",
      programs: ["Fine Arts", "Liberal Arts", "Languages"]
    },
    {
      name: "Medical Sciences",
      programs: ["Pharmacy", "Nursing", "Biomedical Sciences"]
    }
  ]

  const faqs = [
    {
      question: "What are the admission requirements?",
      answer: "Admission requirements vary by program. Generally, we require a competitive academic record, entrance exam scores, and sometimes interviews. For specific program requirements, please visit our Admissions page or contact our Admissions Office."
    },
    {
      question: "Are scholarships available?",
      answer: "Yes, IES University offers a range of merit-based and need-based scholarships. We also honor several government scholarship programs. Our Financial Aid office can provide detailed information about eligibility criteria and application processes."
    },
    {
      question: "What extracurricular activities are available?",
      answer: "We offer a wide range of extracurricular activities including sports teams, cultural clubs, technical societies, performing arts groups, and community service organizations. Our annual festivals like INFORIA and FEST-O-COM are highlights of our vibrant campus life."
    },
    {
      question: "Does the university offer placement assistance?",
      answer: "Absolutely! Our dedicated Training and Placement Cell works year-round to connect students with industry opportunities. We maintain strong relationships with leading companies across sectors and host regular campus recruitment drives."
    },
    {
      question: "Are there accommodation facilities for students?",
      answer: "Yes, IES University provides well-maintained hostel facilities for both male and female students. Our hostels include amenities such as 24/7 security, mess facilities, recreation areas, Wi-Fi, and regular maintenance services."
    }
  ]

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
      >
        <Header />
      </div>

      <div className="flex flex-col min-h-screen bg-black text-yellow-600 pt-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <Link to="/" className="self-start mb-8 flex items-center text-yellow-600 hover:text-yellow-400 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Back to Home</span>
              </Link>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-600">
                  Discover IES University
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-center max-w-4xl mb-12">
                Explore our rich heritage, academic excellence, and vibrant campus life at 
                one of Bhopal's premier educational institutions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                <img 
                  src={campus1 || "/placeholder.svg"} 
                  alt="IES Campus View 1" 
                  className="rounded-lg shadow-lg h-64 object-cover w-full transition-transform hover:scale-105"
                />
                <img 
                  src={campus2 || "/placeholder.svg"} 
                  alt="IES Campus View 2" 
                  className="rounded-lg shadow-lg h-64 object-cover w-full transition-transform hover:scale-105"
                />
                <img 
                  src={campus3 || "/placeholder.svg"} 
                  alt="IES Campus View 3" 
                  className="rounded-lg shadow-lg h-64 object-cover w-full transition-transform hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="about" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="about" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                  About Us
                </TabsTrigger>
                <TabsTrigger value="academics" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                  Academics
                </TabsTrigger>
                <TabsTrigger value="campus" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                  Campus Life
                </TabsTrigger>
                <TabsTrigger value="faqs" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">
                  FAQs
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="border-2 border-yellow-600 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-yellow-500">
                      Our Story
                    </h2>
                    <p className="mb-4">
                      IES University stands as a beacon of educational excellence in Bhopal, India. Established with a vision 
                      to nurture future leaders and innovators, we have grown from our humble beginnings to become one of 
                      the region's most prestigious institutions.
                    </p>
                    <p className="mb-4">
                      Our commitment to academic rigor, research excellence, and holistic development has shaped thousands 
                      of successful careers and contributed to advancements across various fields.
                    </p>
                    <p>
                      At IES, we believe in blending traditional educational values with modern teaching methodologies 
                      and technologies to prepare students for the challenges of tomorrow's world.
                    </p>
                    
                    <h3 className="text-2xl font-semibold mt-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-yellow-500">
                      Our Timeline
                    </h3>
                    <div className="space-y-6">
                      {historyTimeline.map((item, index) => (
                        <div key={index} className="flex border-l-2 border-yellow-600 pl-4">
                          <div>
                            <span className="inline-block px-3 py-1 bg-yellow-600 text-black text-sm font-bold rounded mb-2">
                              {item.year}
                            </span>
                            <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                            <p className="text-yellow-400">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="bg-gradient-to-b from-yellow-900 to-black p-6 rounded-lg shadow-lg">
                      <h3 className="text-2xl font-bold mb-4 text-center">Our Vision & Mission</h3>
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-yellow-400">Vision</h4>
                        <p>To be a globally recognized institution that cultivates excellence, innovation, and leadership.</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2 text-yellow-400">Mission</h4>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Deliver world-class education accessible to all deserving students</li>
                          <li>Foster an environment of innovation and creativity</li>
                          <li>Promote research that addresses real-world challenges</li>
                          <li>Nurture socially responsible and ethically grounded leaders</li>
                        </ul>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-yellow-700">
                        <h4 className="font-semibold mb-4 text-yellow-400">Leadership</h4>
                        <div className="flex flex-col items-center">
                          <img 
                            src={founder || "/placeholder.svg"} 
                            alt="University Founder" 
                            className="w-32 h-32 rounded-full object-cover mb-4"
                          />
                          <p className="font-bold">Dr. Rajesh Kumar</p>
                          <p className="text-sm text-yellow-400">Founder & Chancellor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="academics" className="border-2 border-yellow-600 rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-yellow-500">
                  Academic Excellence
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Departments & Programs</h3>
                    <p className="mb-6">
                      IES University offers a comprehensive range of undergraduate, postgraduate, and doctoral programs 
                      across multiple disciplines designed to prepare students for successful careers and meaningful contributions to society.
                    </p>
                    
                    <div className="space-y-4">
                      {departments.map((dept, index) => (
                        <div 
                          key={index} 
                          className="border border-yellow-600 rounded-lg overflow-hidden"
                        >
                          <div 
                            className="bg-yellow-600 text-black p-4 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleAccordion(index)}
                          >
                            <h4 className="font-bold">{dept.name}</h4>
                            {activeAccordion === index ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                          
                          {activeAccordion === index && (
                            <div className="p-4 bg-black border-t border-yellow-600">
                              <ul className="list-disc list-inside space-y-1">
                                {dept.programs.map((program, idx) => (
                                  <li key={idx}>{program}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-yellow-900 to-black p-6 rounded-lg">
                      <h3 className="text-2xl font-semibold mb-4">Academic Highlights</h3>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Award className="w-8 h-8 mr-4 flex-shrink-0 text-yellow-400" />
                          <div>
                            <h4 className="font-semibold">Accreditation & Rankings</h4>
                            <p className="text-sm text-yellow-400">NAAC 'A++' grade with a score of 3.65/4.0, ranked among top 50 private universities in India</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Users className="w-8 h-8 mr-4 flex-shrink-0 text-yellow-400" />
                          <div>
                            <h4 className="font-semibold">Faculty Excellence</h4>
                            <p className="text-sm text-yellow-400">Over 200 faculty members with PhDs from prestigious institutions worldwide</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Book className="w-8 h-8 mr-4 flex-shrink-0 text-yellow-400" />
                          <div>
                            <h4 className="font-semibold">Research Output</h4>
                            <p className="text-sm text-yellow-400">Published over 5,000 research papers in international journals in the last decade</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <ExternalLink className="w-8 h-8 mr-4 flex-shrink-0 text-yellow-400" />
                          <div>
                            <h4 className="font-semibold">Global Partnerships</h4>
                            <p className="text-sm text-yellow-400">Collaborations with 50+ universities and research institutions across 20 countries</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-900 to-black p-6 rounded-lg">
                      <h3 className="text-2xl font-semibold mb-4">Placements & Career Services</h3>
                      <p className="mb-4">
                        Our dedicated Training & Placement Cell has established strong connections with leading organizations 
                        across industries, ensuring excellent career opportunities for our students.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-yellow-400">95%</p>
                          <p className="text-sm">Placement Rate</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-yellow-400">₹12L</p>
                          <p className="text-sm">Average Package</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-yellow-400">300+</p>
                          <p className="text-sm">Recruiting Companies</p>
                        </div>
                        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                          <p className="text-3xl font-bold text-yellow-400">₹42L</p>
                          <p className="text-sm">Highest Package</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="campus" className="border-2 border-yellow-600 rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-yellow-500">
                  Vibrant Campus Life
                </h2>
                
                <p className="mb-8 text-lg">
                  At IES University, we believe that education extends beyond the classroom. Our vibrant campus life offers 
                  countless opportunities for students to explore their interests, develop new skills, and forge lifelong friendships.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Campus Facilities</h3>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Modern Academic Buildings",
                          description: "State-of-the-art classrooms, labs and seminar halls equipped with the latest technology."
                        },
                        {
                          title: "Central Library",
                          description: "Extensive collection of books, journals, and digital resources with peaceful study spaces."
                        },
                        {
                          title: "Sports Complex",
                          description: "Multi-sport facility including cricket ground, football field, tennis courts, and indoor games."
                        },
                        {
                          title: "Student Residences",
                          description: "Comfortable, secure hostels with modern amenities for both male and female students."
                        },
                        {
                          title: "Innovation Hub",
                          description: "Dedicated space for startups, research projects, and creative collaborations."
                        }
                      ].map((facility, index) => (
                        <div key={index} className="border border-yellow-600 rounded-lg p-4 hover:bg-yellow-600 hover:bg-opacity-10 transition">
                          <h4 className="font-semibold mb-2">{facility.title}</h4>
                          <p className="text-yellow-400">{facility.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Student Activities</h3>
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-900 to-black p-6 rounded-lg">
                        <h4 className="font-bold text-lg mb-3 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                          Annual Events
                        </h4>
                        <ul className="space-y-2">
                          <li>
                            <span className="font-semibold">INFORIA</span> - Our flagship technical fest featuring competitions, workshops, and exhibitions
                          </li>
                          <li>
                            <span className="font-semibold">UTSAV</span> - Cultural extravaganza showcasing performances, art, and creative expressions
                          </li>
                          <li>
                            <span className="font-semibold">ATVC</span> - National-level vehicle design competition testing engineering excellence
                          </li>
                          <li>
                            <span className="font-semibold">FEST-O-COM</span> - Welcome celebration for new students with games and team activities
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-r from-yellow-900 to-black p-6 rounded-lg">
                        <h4 className="font-bold text-lg mb-3">Student Clubs & Societies</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            "Robotics Club", "Literary Society", 
                            "Dance Troupe", "Music Band",
                            "Photography Club", "Debate Society",
                            "Entrepreneurship Cell", "Sports Teams",
                            "Coding Club", "Green Initiative"
                          ].map((club, index) => (
                            <div key={index} className="bg-black bg-opacity-50 py-2 px-3 rounded text-center">
                              {club}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border border-yellow-600 p-6 rounded-lg">
                        <h4 className="font-bold text-lg mb-3">Community Engagement</h4>
                        <p className="mb-4">
                          IES University is committed to creating positive social impact through community service initiatives:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-yellow-400">
                          <li>Rural education outreach programs</li>
                          <li>Environmental conservation projects</li>
                          <li>Health awareness campaigns</li>
                          <li>Skill development workshops for underprivileged youth</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <h3 className="text-2xl font-semibold mb-4">Virtual Campus Tour</h3>
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                    <p className="text-lg">Interactive campus tour coming soon!</p>
                    <p className="text-sm text-yellow-400 mt-2">Explore our facilities virtually</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faqs" className="border-2 border-yellow-600 rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-yellow-500">
                  Frequently Asked Questions
                </h2>
                
                <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-yellow-600 rounded-lg overflow-hidden"
                    >
                      <div 
                        className="bg-yellow-600 text-black p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleAccordion(`faq-${index}`)}
                      >
                        <h4 className="font-bold">{faq.question}</h4>
                        {activeAccordion === `faq-${index}` ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                      
                      {activeAccordion === `faq-${index}` && (
                        <div className="p-4 bg-black border-t border-yellow-600">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 text-center">
                  <h3 className="text-xl font-semibold mb-4">Have More Questions?</h3>
                  <p className="mb-6">Our admissions team is here to help you get all the information you need.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <div className="bg-gradient-to-r from-purple-900 to-black p-4 rounded-lg flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-yellow-400" />
                      <div>
                        <p className="font-semibold">Visit Us</p>
                        <p className="text-sm text-yellow-400">IES University, Ratibad, Bhopal</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-900 to-black p-4 rounded-lg">
                      <p className="font-semibold">Contact Admissions</p>
                      <p className="text-sm text-yellow-400">admissions@iesuniversity.ac.in | +91 755-123-4567</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900 to-yellow-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Join the IES Community?</h2>
            <p className="text-lg text-yellow-200 mb-8">
              Take the next step in your educational journey with IES University
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/registration_page">
                <button className="px-8 py-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition shadow-lg flex items-center justify-center">
                  Apply Now
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-8 py-4 bg-white text-yellow-600 rounded-md hover:bg-yellow-50 transition shadow-lg">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  )
}
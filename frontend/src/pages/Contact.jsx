"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, CheckCircle } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <>
      <Header />
      <section className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header with animated gradient */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              Get in Touch
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Have questions about our events or need assistance? Our team is here to help you create an unforgettable
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:shadow-xl hover:border-purple-500 hover:-translate-y-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="bg-gray-700 p-3 rounded-full group-hover:bg-purple-600 transition-colors duration-300">
                    <MapPin
                      className="text-yellow-400 group-hover:text-white transition-colors duration-300"
                      size={24}
                    />
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-lg text-white">Our Location</p>
                    <p>IES College of Technology</p>
                    <p>Ratibad Main Road, Bhopal</p>
                    <p>Madhya Pradesh - 462044</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-gray-700 p-3 rounded-full group-hover:bg-pink-600 transition-colors duration-300">
                    <Mail className="text-yellow-400 group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-lg text-white">Email Us</p>
                    <p>info@iescollege.ac.in</p>
                    <p>festhive@iescollege.ac.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-gray-700 p-3 rounded-full group-hover:bg-yellow-600 transition-colors duration-300">
                    <Phone
                      className="text-yellow-400 group-hover:text-white transition-colors duration-300"
                      size={24}
                    />
                  </div>
                  <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                    <p className="font-medium text-lg text-white">Call Us</p>
                    <p>+91 1234567890</p>
                    <p>Mon-Fri, 9AM to 5PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-xl font-semibold mb-4 text-yellow-400">Connect With Us</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-gray-700 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook className="text-white" size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 p-3 rounded-full hover:bg-pink-600 transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram className="text-white" size={20} />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 p-3 rounded-full hover:bg-blue-400 transition-colors duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="text-white" size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl shadow-lg border border-gray-700 transform transition-all duration-300 hover:shadow-xl hover:border-yellow-500 hover:-translate-y-1">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <div className="bg-green-500/20 p-4 rounded-full mb-4">
                    <CheckCircle className="text-green-500" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                  <p className="text-gray-300">Thank you for contacting us. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    Send a Message
                  </h3>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this regarding?"
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Type your message here..."
                      rows={5}
                      className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center
                      ${isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black shadow-lg hover:shadow-xl"}`}
                  >
                    {isLoading ? (
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    ) : null}
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 md:mt-16">
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Find Us Here
            </h3>
            <div className="bg-gray-800 p-1 rounded-2xl shadow-lg border border-gray-700 overflow-hidden h-64 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.2093742113196!2d77.4366863!3d23.2332395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4268ed6d2f4d%3A0x9b022c69c7e3b425!2sIES%20University!5e0!3m2!1sen!2sin!4v1716042992788!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IES University Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} IES College of Technology FestHive. All rights reserved.</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

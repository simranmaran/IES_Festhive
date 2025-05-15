"use client"

import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  return (
    <section className="min-h-screen bg-black text-yellow-600 px-4 md:px-6 py-8 md:py-12">
      <h2 className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold mb-6 md:mb-10 text-center">
        Get in Touch
      </h2>
      <p className="text-lg md:text-xl bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold mb-6 md:mb-10 text-center">
        Have questions about our events or need assistance? Send us a message!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl md:text-3xl bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text font-bold mb-6 md:mb-10">
            Contact Information
          </h3>

          <div className="mb-4 flex items-start gap-3">
            <MapPin className="text-yellow-600 mt-1 flex-shrink-0" />
            <div>
              <p>IES College of Technology</p>
              <p>Ratibad Main Road, Bhopal</p>
              <p>Madhya Pradesh - 462044</p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <Mail className="text-yellow-600 flex-shrink-0" />
            <div>
              <p>info@iescollege.ac.in</p>
              <p>festhive@iescollege.ac.in</p>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <Phone className="text-yellow-600 flex-shrink-0" />
            <p>+91 1234567890</p>
          </div>

          <h4 className="text-yellow-600 mb-2">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook text-xl text-white"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram text-xl text-white"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter text-xl text-white"></i>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Send a Message
          </h3>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-yellow-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-yellow-600"
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-yellow-600"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded bg-gray-700 text-white placeholder-yellow-600 h-24 md:h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-black font-semibold"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  )
}

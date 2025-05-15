"use client"

import { useEffect, useState } from "react"

export default function AutoFlowSlider() {
  const events = ["UTSAV", "GARBA", "DJ NIGHT", "ATVC", "INFORIA", "FEST-O-COM"]
  const flowingItems = [...events, ...events, ...events] // Triple for smoother loop
  const [isHovered, setIsHovered] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState("30s")

  // Change animation speed on hover
  useEffect(() => {
    setAnimationSpeed(isHovered ? "60s" : "30s")
  }, [isHovered])

  return (
    <div
      className="overflow-hidden w-full bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 py-4 md:py-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 50 + 20}px`,
              height: `${Math.random() * 50 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animation: "float infinite ease-in-out",
            }}
          />
        ))}
      </div>

      <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500">
        Upcoming Events
      </h2>

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `scroll ${animationSpeed} linear infinite`,
          transition: "animation-duration 0.5s ease",
        }}
      >
        {flowingItems.map((event, index) => (
          <div
            key={index}
            className="min-w-[180px] md:min-w-[220px] h-[100px] md:h-[120px] mx-2 md:mx-4 bg-gradient-to-br from-yellow-600/80 to-yellow-800/90 rounded-xl shadow-lg 
                      flex items-center justify-center text-lg md:text-xl font-bold text-white transform transition-all duration-300
                      hover:scale-105 hover:shadow-yellow-500/30 hover:from-yellow-500 hover:to-yellow-700 cursor-pointer
                      border border-yellow-500/30"
          >
            <div className="relative z-10 px-4 py-2">
              <span className="block text-center">{event}</span>
              <div className="h-0.5 w-1/2 bg-white/50 mx-auto mt-2"></div>
              <span className="block text-xs text-center mt-1 text-yellow-200">Coming Soon</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add keyframes for the animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${events.length * 228}px);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.5;
          }
        }
        
        @media (max-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${events.length * 184}px);
            }
          }
        }
      `}</style>
    </div>
  )
}

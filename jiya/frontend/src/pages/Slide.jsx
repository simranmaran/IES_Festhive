import React, { useEffect, useState } from 'react';

// Import your images
import UTSAV from "../assets/utsav.jpg";
import GARBA from "../assets/garba.jpg";
import DJ_NIGHT from "../assets/djnight.jpg";
import ATVC from "../assets/atvc.jpg";

const images = [UTSAV, GARBA, DJ_NIGHT, ATVC];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clear on unmount
  }, []);

  return (
    <div style={{ width: '100%', height: '600px', overflow: 'hidden', position: 'relative' }}>
    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-yellow-600 bg-clip-text text-transparent text-center mb-10 ">GALLERY</h2>
      <img
        src={images[currentIndex]}
        alt="event"
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.5s ease-in-out' }}
      />
    </div>
  );
}

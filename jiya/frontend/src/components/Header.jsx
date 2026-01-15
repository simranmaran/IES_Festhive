import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-700">
                IES Festhive
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-10">
              <Link to="/" className="text-yellow-700 hover:text-yellow-700 transition">Home</Link>
              <Link to="/Events" className="text-yellow-700 hover:text-yellow-700 transition">Events</Link>
              <Link to="/contact" className="text-yellow-700 hover:text-yellow-700 transition">Contact</Link>
              <Link to="/AboutUs" className="text-yellow-700 hover:text-yellow-700 transition">AboutUs</Link>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/signup">
                <button className="px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-800 transition shadow-md">
                  Signup
                </button>
              </Link>
              <Link to="/login">
                <button className="px-4 py-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-800 transition shadow-md">
                  Login
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md focus:outline-none bg-yellow  text-white ">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-yellow-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-md">Home</Link>
              <Link to="/Events" className="block px-3 py-2 text-base font-medium text-yellow-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-md">Events</Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-yellow-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-md">Contact</Link>
              <Link to="/AboutUs" className="block px-3 py-2 text-base font-medium text-yellow-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-md">AboutUs</Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="mt-3 px-2 space-y-1">
                <Link to="/signup">
                  <button className="w-full block px-3 py-2 text-center bg-yellow-700 text-white rounded-md hover:bg-yellow-800 transition">
                    Student Signup
                  </button>
                </Link>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link to="/login">
                  <button className="w-full block px-3 py-2 text-center bg-yellow-700 text-white rounded-md hover:bg-yellow-800 transition">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;

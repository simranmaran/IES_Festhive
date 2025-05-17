import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartcontext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.profilePic) {
          setProfileImage(parsedUser.profilePic);
        }
      } else {
        setUser(null);
        setProfileImage(null);
      }
    };

    checkUserStatus();
    window.addEventListener("storage", checkUserStatus);
    window.addEventListener("userStateChanged", checkUserStatus);

    return () => {
      window.removeEventListener("storage", checkUserStatus);
      window.removeEventListener("userStateChanged", checkUserStatus);
    };
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(null);
    window.dispatchEvent(new Event("userStateChanged"));
    navigate("/");
  };

  const handleUserAction = (path) => {
    navigate(path);
    setIsOpen(null);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const categories = {
        "new arrival": "/new-arrival",
        "living area": "/living-area",
        "bedroom": "/bedroom",
        "garden area": "/garden-area",
        "bd": "/bedroom",
        "la": "/living-area",
        "ga": "/garden-area",
      };

      const searchTerm = searchQuery.toLowerCase();
      navigate(categories[searchTerm] || `/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        <NavLink to="/" className="text-xl font-bold" onClick={handleNavClick}>
          <h1 className="text-4xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-yellow-700">
            IES<span className="text-yellow-700">FESTHIVE</span>
          </h1>
        </NavLink>

        <button
          className="md:hidden text-white hover:text-white "
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <ul
          className={`md:flex space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {[
            { path: "/", label: "Home" },
            { path: "/Events", label: "Events" },
            { path: "/AboutUs", label: "AboutUs" },
            { path: "/contactus", label: "ContactUs" },
          ].map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className="block text-yellow-700 hover:text-yellow-800 font-semibold py-2"
                onClick={handleNavClick}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block w-64">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="border border-gray-300 w-full rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-700"
          />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <button
              onClick={() => setIsOpen(isOpen === "user" ? null : "user")}
              className="text-yellow-700 hover:text-yellow-800"
            >
              {profileImage ? (
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-yellow-700"
                />
              ) : (
                <FaUser size={24} />
              )}
            </button>

            {isOpen === "user" && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-32 z-10">
                {user ? (
                  <>
                    <button
                      onClick={() => handleUserAction("/profile")}
                      className="block px-4 py-2 text-yellow-700 hover:bg-yellow-50 w-full text-left"
                    >
                      {user.fullName}
                    </button>
                    <button
                      onClick={() => handleUserAction("/edit-profile")}
                      className="block px-4 py-2 text-yellow-700 hover:bg-yellow-50 w-full text-left"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-yellow-700 hover:bg-yellow-50 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleUserAction("/login")}
                      className="block px-4 py-2 text-yellow-700 hover:bg-yellow-50 w-full text-left"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleUserAction("/signup")}
                      className="block px-4 py-2 text-yellow-700 hover:bg-yellow-50 w-full text-left"
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="text-yellow-700 hover:text-yellow-800 relative"
          >
            
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

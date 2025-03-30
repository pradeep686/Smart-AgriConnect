import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import ProfilePicture from "./profilePicture"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    console.log("Profile picture clicked!"); // Debugging log
    setIsDropdownOpen((prev) => !prev);
  };



  return (
    <>
      {/* Sidebar Toggle Button */}
      {/* <button
        onClick={toggleSidebar}
        className="fixed top-5 left-2 z-50 bg-green-700 text-white p-3 rounded-lg shadow-lg focus:outline-none"
      >
        {isOpen ? "✖" : "≡"}
      </button> */}

      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-54 h-screen bg-gradient-to-b from-green-700 to-green-900 text-white shadow-lg p-12 transform"
      >
        {/* Logo */}
        <h2 className="text-2xl font-extrabold mb-8 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:-rotate-1">
            Smart<br />
          </span>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:rotate-1">
            AgriConnect
          </span>
        </h2>

        {/* Navigation Links */}
        <ul className="w-full space-y-4">
          {["homepage", "subsidies", "crop-insight", "crop-protect", "weather", "trade-hub", "forum", "feedback"].map(
            (item, index) => (
              <li key={index}>
                <Link
                  to={`/${item}`}
                  className="block py-3 text-lg font-semibold hover:scale-99 !hover:text-white-300 capitalize"
                >
                  {item.replace("-", " ")}
                </Link>
              </li>
            )
          )}
        </ul>
      </motion.div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-2 right-2 p-3 flex items-center  z-[9999]">
      <ProfilePicture 
        isDropdownOpen={isDropdownOpen} 
        toggleDropdown={toggleDropdown} 
        setIsDropdownOpen={setIsDropdownOpen} 
      />
    </nav>

    </>
  );
};

export default Navbar;

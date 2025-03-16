import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import for animation

const Navbar = ({ onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 bg-green-700 text-white p-3 rounded-lg shadow-lg focus:outline-none"
      >
        {isOpen ? "✖" : "≡"}
      </button>

      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-64 h-screen bg-gradient-to-b from-green-700 to-green-900 text-white shadow-lg p-6 transform"
      >
        {/* Logo */}
        <h2 className="text-3xl font-extrabold mb-8 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:-rotate-1">
            Smart<br />
          </span>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:rotate-1">
            AgriConnect
          </span>
        </h2>

        {/* Navigation Links */}
        <ul className="w-full space-y-4">
          <li><Link to="/homepage" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">Home</Link></li>
          <li><Link to="/subsidies" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">Subsidies</Link></li>
          <li><Link to="/crop-insight" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">CropInsight</Link></li>
          <li><Link to="/crop-protect" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">CropProtect</Link></li>
          <li><Link to="/weather" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">Weather</Link></li>
          <li><Link to="/trade-hub" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">TradeHub</Link></li>
          <li><Link to="/discussion" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">Discussion</Link></li>
          <li><Link to="/feedback" className="block py-3 text-lg font-semibold hover:scale-110 hover:text-yellow-300">Feedback</Link></li>
        </ul>

        {/* Login / Sign Up Button */}
        <Link
          to='/login'
          onClick={onLoginClick}
          className="mt-6 block bg-red-500 text-white text-lg font-bold px-4 py-2 rounded-lg shadow-md transition-transform duration-300 hover:scale-110 hover:bg-red-700 text-center"
        >
          Login / Sign Up
        </Link>
      </motion.div>
    </>
  );
};

export default Navbar;

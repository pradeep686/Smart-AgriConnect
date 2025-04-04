import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Outlet, Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-green-100 min-h-screen relative">
      {/* Sidebar - Fixed */}
      <div className="w-72 bg-green-700 text-white p-6 flex flex-col shadow-lg fixed left-0 top-0 h-screen">
        {/* Logout Button - Moved inside sidebar at top left */}
        <motion.button
          className="absolute top-8 left-362 bg-red-600 z-44 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition-transform hover:scale-105"
          onClick={() => navigate("/")}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaSignOutAlt className="text-2xl" />
        </motion.button>

        <h2 className="text-2xl font-extrabold mb-8 text-center mt-12">
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:-rotate-1">
            Admin<br />
          </span>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:rotate-1">
            Dashboard
          </span>
        </h2>

        {/* Sidebar Links */}
        <nav className="space-y-4 flex-1">
          <Link to='/add-subsidies' className="block px-4 py-3 rounded-lg font-medium transition duration-300 hover:bg-green-500">
            📝 Subsidies
          </Link>
          <Link to='/add-cropinsigts' className="block px-4 py-3 rounded-lg font-medium transition duration-300 hover:bg-green-500">
            🌾 Crop Insight
          </Link>
          <Link to='/add-pesticides' className="block px-4 py-3 rounded-lg font-medium transition duration-300 hover:bg-green-500">
            🌿 Crop protect
          </Link>
        </nav>
      </div>         
    </div>
  );
}

export default Navbar;
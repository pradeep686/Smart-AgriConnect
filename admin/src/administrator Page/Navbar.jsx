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
          className="absolute top-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition-transform hover:scale-105"
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
            📝 Add Subsidies
          </Link>
          <Link to='/add-crop-insight' className="block px-4 py-3 rounded-lg font-medium transition duration-300 hover:bg-green-500">
            🌾 Add Crop Insight
          </Link>
          <Link to='/add-fertilizer' className="block px-4 py-3 rounded-lg font-medium transition duration-300 hover:bg-green-500">
            🌿 Add Fertilizer
          </Link>
          <Link to='/add-pesticide' className="block px-4 py-3 rounded-lg font-medium transition duration-300 hover:bg-green-500">
            🐞 Add Pesticide
          </Link>
        </nav>
      </div>

      {/* Content Area for Pages */}
      <div className="flex-1 ml-72 p-10 bg-green-50 min-h-screen overflow-y-auto">
        <Outlet />  {/* 👈 This renders other pages */}
      </div>
    </div>
  );
}

export default Navbar;
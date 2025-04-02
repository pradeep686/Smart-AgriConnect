import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex bg-green-100 h-screen relative">
      {/* Sidebar - Fixed */}
      <div className="w-72 bg-green-700 text-white p-6 flex flex-col shadow-lg fixed left-0 top-0 h-screen">
        <h2 className="text-2xl font-extrabold mb-8 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:-rotate-1">
            Admin<br />
          </span>
          <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:rotate-1">
            Dashboard
          </span>
        </h2>

        {/* Sidebar Headings */}
        <nav className="space-y-4 flex-1">
          <div className="block px-4 py-3 rounded-lg font-medium transition duration-300">
            📝 Add Subsidies
          </div>
          <div className="block px-4 py-3 rounded-lg font-medium transition duration-300">
            🌾 Add Crop Insight
          </div>
          <div className="block px-4 py-3 rounded-lg font-medium transition duration-300">
            🌿 Add Fertilizer
          </div>
          <div className="block px-4 py-3 rounded-lg font-medium transition duration-300">
            🐞 Add Pesticide
          </div>
        </nav>
</div>

      {/* Logout Button */}
      <motion.button
        className="absolute top-6 right-6 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition-transform hover:scale-105"
        onClick={() => navigate("/")}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaSignOutAlt className="text-2xl" />
      </motion.button>

      {/* Content Area - Scrollable */}
      <div className="flex-1 ml-72 p-10 bg-green-50 overflow-y-auto h-screen">
        <motion.div
          className="text-green-900 text-3xl font-semibold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-50 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🌿 <span className="font-bold text-green-700">Welcome to the Agriculture Admin Panel!</span>
              <p className="mt-2 text-lg text-orange-500">
                Manage your subsidies, crop insights, fertilizers, and pesticides efficiently.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;
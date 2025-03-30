import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa"; // Import home icon

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("/dashboard");

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <div className="flex bg-green-100 h-screen">
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
        <nav className="space-y-4 flex-1">
          <Link
            to="/dashboard/add-subsidies"
            className={`block px-4 py-3 rounded-lg font-medium transition duration-300 ${
              active === "/dashboard/add-subsidies" 
            }`}
          >
            📝 Add Subsidies
          </Link>
          <Link
            to="/dashboard/add-crop-insight"
            className={`block px-4 py-3 rounded-lg font-medium transition duration-300 ${
              active === "/dashboard/add-crop-insight" 
            }`}
          >
            🌾 Add Crop Insight
          </Link>
          <Link
            to="/dashboard/add-fertilizer"
            className={`block px-4 py-3 rounded-lg font-medium transition duration-300 ${
              active === "/dashboard/add-fertilizer"
            }`}
          >
            🌿 Add Fertilizer
          </Link>
          <Link
            to="/dashboard/add-pesticide"
            className={`block px-4 py-3 rounded-lg font-medium transition duration-300 ${
              active === "/dashboard/add-pesticide" 
            }`}
          >
            🐞 Add Pesticide
          </Link>
        </nav>

        {/* Return Home Button */}
        {/* Return Home Button */}
<motion.button
  className="bg-yellow-500 text-white font-semibold !py-2 !px-8 rounded-full shadow-lg transition-transform transform hover:scale-101 !hover:bg-yellow-600 flex items-center justify-center gap-3 absolute bottom-6 left-1/2 -translate-x-1/2"
  onClick={() => navigate("/")}
  whileHover={{ y: -3 }}
  whileTap={{ scale: 0.9 }}
>
  <FaHome className="!text-5xl" /> {/* Increased icon size */}
  <span className="!text-white">Return Home</span>
</motion.button>

      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 ml-72 p-10 bg-green-50 overflow-y-auto h-screen">
        <motion.div
          className="text-green-900 text-3xl font-semibold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {location.pathname === "/dashboard" ? (
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
          ) : (
            <Outlet />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AdminDashboard;

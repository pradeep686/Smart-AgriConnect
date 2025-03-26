import React from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePicture = ({ isDropdownOpen, toggleDropdown, setIsDropdownOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsDropdownOpen(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="relative">
      {/* Profile Picture Button */}
      <div 
        onClick={toggleDropdown} 
        className="w-12 h-12 rounded-full border-2 border-green-700 overflow-hidden shadow-md cursor-pointer"
      >
        <img 
          src="/images/profile.webp" 
          alt="User Profile" 
          className="w-full h-full rounded-full"
        />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border-gray-200 p-3 z-50">
          {token ? (
            <>
              {/* User Info */}
              <Link
                to="/personal-info"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2 px-7 py-2 text-green-600 font-semibold"
              >
                <User className="w-4 h-4" /> User Info
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-7 py-2 text-red-600 font-semibold w-full text-left"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            /* Login */
            <Link
              to="/login"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2 px-7 py-2 text-green-600 font-semibold"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;

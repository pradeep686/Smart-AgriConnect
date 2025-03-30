import React, { useState, useEffect } from "react";
import { LogIn, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePicture = ({ isDropdownOpen, toggleDropdown, setIsDropdownOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userName, setUserName] = useState("");
  const [closeTimeout, setCloseTimeout] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUserName();
    }
  }, [token]);

  const fetchUserName = async () => {
    try {
      const response = await axios.get("http://localhost:9009/userLogin/me", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setUserName(response.data.name); // Assuming the response contains only the name
    } catch (error) {
      console.error("Error fetching user name:", error.response?.data?.msg || error.message);
      setUserName(""); // Reset user name on error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setUserName(""); // Clear user name
    setIsDropdownOpen(false);
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    if (isDropdownOpen) {
      // Set a timeout to close the dropdown after 5 seconds
      const timeout = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 3000);

      setCloseTimeout(timeout);
    } else {
      // Clear the timeout if dropdown is closed manually
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        setCloseTimeout(null);
      }
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative ">
      {/* Profile Picture Button */}
      <div
        onClick={() => {
          toggleDropdown();
          if (closeTimeout) clearTimeout(closeTimeout); // Reset timer on click
        }}
        className="w-12 h-12 rounded-full border-2 border-green-700 overflow-hidden shadow-md cursor-pointer "
      >
        <img src="/images/profile.webp" alt="User Profile" className="w-full h-full rounded-full" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border-gray-200 p-3 z-50">
          {token ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-lg">Welcome,</span>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-lg">
                  {userName}
                </span>
              </div>

              <hr className="my-2" />

              {/* User Info */}
              <Link
                to="/personal-info"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2 px-7 py-2 !text-green-600 font-semibold"
              >
                <User className="w-4 h-4" /> User Info
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-2 !py-2 text-white font-semibold text-sm !bg-red-500 hover:bg-red-700 transition-all duration-300 ease-in-out shadow-md rounded-lg border border-red-700 hover:shadow-lg active:scale-95"
                style={{ color: "white !important" }} // Ensuring text color override
              >
                <LogOut className="w-3 h-3" /> Logout
              </button>
            </>
          ) : (
            /* Login */
            <Link
              to="/login"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2 px-7 py-2 !text-green-600 font-semibold"
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

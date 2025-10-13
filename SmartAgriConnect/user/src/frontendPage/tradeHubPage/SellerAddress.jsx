import React, { useState, useEffect } from "react";

import axios from "axios";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:9010/userAddress";

function SellerAddress() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/get`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setPersonalInfo(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!personalInfo) {
    return <p>No personal information available.</p>;
  }



  return (
    
    <div className="ml-64 p-8 flex-1 bg-gray-100 min-h-screen"><br /><br />
       
{/* <Link to=">
<button className="relative font-semibold text-white transition duration-300 ease-in-out !bg-red-600 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl active:scale-95">
  Back
</button>
</Link><br /> */}
<motion.button
  className="fixed top-8 right-290 !bg-red-600 z-44 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition-transform hover:scale-105"
  onClick={() => navigate("/buyer")}
  whileHover={{ y: -3 }}
  whileTap={{ scale: 0.9 }}
>
  <FaSignOutAlt className="text-2xl" />
</motion.button>


    <div style={{ display: "flex", minHeight: "60vh", backgroundColor: "#f8f9fa", padding: "40px" }}>
      <div style={{ flex: 1, padding: "40px", borderRadius: "10px", backgroundColor: "white", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}>
          🛒 Seller Address Details
        </h2>

        <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f8f9fa" }}>
          {[
            { label: "Full Name", value: personalInfo.fullName },
            { label: "Phone Number", value: personalInfo.phoneNumber },
            { label: "Email", value: personalInfo.email },
            { label: "Taluk", value: personalInfo.taluk },
            { label: "District", value: personalInfo.district },
            { label: "State", value: personalInfo.state },
            { label: "Pin Code", value: personalInfo.pinCode },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <h2 style={{ flex: 1, textAlign: "left", margin: 0 }}>
                <strong>{item.label}:</strong>
              </h2>
              <h2 style={{ flex: 1, textAlign: "center", margin: 0 }}>{item.value || "-"}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default SellerAddress;

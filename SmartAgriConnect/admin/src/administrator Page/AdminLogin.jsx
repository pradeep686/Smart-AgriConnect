import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:9010/api/auth";

export default function AdminLogin() {
  const nav=useNavigate()
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // Store OTP as an array
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // Function to send OTP
  const sendOtp = async () => {
    try {
      const res = await axios.post(`${API_URL}/send-otp`, { email });
      setMessage(res.data.message);
      setOtpSent(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending OTP");
    }
  };

  // Function to handle OTP input
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if a digit is entered
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Function to verify OTP and login
  const verifyOtp = async () => {
    const enteredOtp = otp.join(""); // Convert array to a string
    if (enteredOtp.length !== 6) {
      setMessage("Please enter the complete OTP.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/verify-otp`, { email, otp: enteredOtp });
      localStorage.setItem("token", res.data.token);
      nav('add-subsidies')
      setMessage("Login successful");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/001/896/154/non_2x/rice-field-at-sunrise-free-photo.jpg')" }}
    >
      <div className="p-6 max-w-md w-full bg-white shadow-lg rounded-lg relative">
        {/* Inside Form Image */}
        <div className="flex justify-center mb-4">
          <img src="https://tse3.mm.bing.net/th?id=OIP.AfRhuIyCCDv_tkOKIFcbawHaHa&pid=ImgDet&w=184&h=184&c=7" alt="Admin" className="w-20 h-20" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* OTP Input (Only Visible After Sending OTP) */}
        {otpSent && (
          <div>
            <label className="block text-gray-700 font-medium mb-2">Enter OTP:</label>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="border p-2 w-10 text-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
        )}

        {/* Send OTP / Verify OTP Button */}
        {!otpSent ? (
          <button onClick={sendOtp} className="bg-blue-500 text-white p-2 w-full mt-4 rounded-md hover:bg-blue-600">
            Send OTP
          </button>
        ) : (
          <button onClick={verifyOtp} className="bg-green-500 text-white p-2 w-full mt-4 rounded-md hover:bg-green-600">
            Verify OTP & Login
          </button>
        )}

        {/* Display Messages */}
        <p className="text-red-500 mt-2 text-center">{message}</p>
      </div>
    </div>
  );
}

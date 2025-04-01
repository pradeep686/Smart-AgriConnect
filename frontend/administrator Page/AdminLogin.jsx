import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9009/api/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

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

  // Function to verify OTP and login
  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful");
      navigate("/admin-dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter Admin Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {/* OTP Input (Only Visible After Sending OTP) */}
      {otpSent && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-2"
        />
      )}

      {/* Send OTP / Verify OTP Button */}
      {!otpSent ? (
        <button onClick={sendOtp} className="bg-blue-500 text-white p-2 w-full">
          Send OTP
        </button>
      ) : (
        <button onClick={verifyOtp} className="bg-green-500 text-white p-2 w-full">
          Verify OTP & Login
        </button>
      )}

      {/* Display Messages */}
      <p className="text-red-500 mt-2">{message}</p>
    </div>
  );
}

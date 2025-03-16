import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9009/userLogin/forgotPassword", formData);
      alert(res.data.msg);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/login2.jpeg')" }}>
      <div className="relative bg-white shadow-xl rounded-2xl w-96 border-2 border-green-500">
        <div className="h-40 bg-cover bg-center rounded-t-2xl" style={{ backgroundImage: "url('/images/login.jpg')" }}></div>

        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">Reset Password</h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" required />

            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Old Password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all pr-12" required />
              <span onClick={togglePasswordVisibility} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold cursor-pointer hover:underline">
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="relative">
              <input type={showNewPassword ? "text" : "password"} name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all pr-12" required />
              <span onClick={toggleNewPasswordVisibility} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold cursor-pointer hover:underline">
                {showNewPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold transition-all hover:bg-green-600 shadow-md">Reset Password</button>
          </form>

          <p className="mt-5 text-gray-700 text-center">
            <span onClick={() => navigate("/login")} className="text-green-600 cursor-pointer font-bold hover:underline">Back to Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

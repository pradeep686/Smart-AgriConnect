import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ({ onClose, onSwitchToSignUp, onSwitchToReset }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const log = await axios.post('http://localhost:9009/userLogin/login', formData);
      
      if (log.data.error) {
        alert(log.data.error);  
        if (log.data.error.includes("User not found")) {
          navigate('/signup');
        }
      } else {
        localStorage.setItem('token', log.data.token);
        alert('Login successful');
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("User not found. Please register.");
          navigate('/signup');
        } else if (error.response.status === 400) {
          alert('Please enter all fields');
        } else if (error.response.status === 401) {
          alert('Invalid password. Try again.');
          setFormData({ ...formData, password: "" });
        }
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/login2.jpeg')" }}>
      <div className="relative bg-white shadow-xl rounded-2xl w-96 border-2 border-green-500">
        <div className="h-40 bg-cover bg-center rounded-t-2xl" style={{ backgroundImage: "url('/images/login.jpg')" }}></div>

        <div className="p-8">
          <Link to="/" className="absolute top-3 right-3 bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-all">
            ✖
          </Link>

          <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" required />

            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all pr-12" required />
              <span onClick={togglePasswordVisibility} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold cursor-pointer hover:underline">
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit" className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold transition-all hover:bg-orange-500 shadow-md">Login</button>
          </form>

          <p className="mt-5 text-green-700 text-center">
             <Link to='/signup' className="text-green-600 cursor-pointer font-bold hover:underline"><p className="text-green-600"><span className="text-md text-black">Don't have an account?</span>Sign Up</p></Link>
          </p>
          <p className="mt-3 ttext-green-600 text-center">
            <Link to='/reset-password' className="text-red-600 cursor-pointer font-bold hover:underline"><p className="text-green-600">Reset Password?</p></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false); // To show a loading state
  const [error, setError] = useState(""); // To display API errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:9009/userLogin/create", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.msg); // Show success message
      navigate("/login"); // Redirect to login page after signup
    } catch (error) {
      setError(error.response?.data?.msg || "Something went wrong!");
    } finally {
      setLoading(false);
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

          <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">Create Account</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <input type="text" name="name" placeholder="Username" value={formData.name} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" required />

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all" required />

            <div className="relative">
              <input type={showPassword.password ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all pr-12" required />
              <span onClick={() => togglePasswordVisibility("password")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold cursor-pointer hover:underline">
                {showPassword.password ? "Hide" : "Show"}
              </span>
            </div>

            <div className="relative">
              <input type={showPassword.confirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all pr-12" required />
              <span onClick={() => togglePasswordVisibility("confirmPassword")} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold cursor-pointer hover:underline">
                {showPassword.confirmPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit" className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold transition-all hover:bg-orange-500 shadow-md" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-5 text-gray-700 text-center">
 <Link to="/login" className="text-green-600 cursor-pointer font-bold hover:underline"><p className="text-green-600"><span className="text-md text-black">Already have an account?</span>Login</p></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

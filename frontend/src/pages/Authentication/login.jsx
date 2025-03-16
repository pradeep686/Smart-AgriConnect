import { useState } from "react";

const AuthPage = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setFormData({ username: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isSignUp ? "Signed Up" : "Logged In"} successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative bg-white shadow-xl rounded-2xl p-8 w-96 border-2 border-green-500">
        
        {/* Close Button (Mild Orange) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 !bg-orange-400 text-white w-8 h-8 flex items-center justify-center rounded-full hover:!bg-orange-500 transition-all"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
            required
          />

          {/* Login / Sign Up Button (Light Grey) */}
          <button
            type="submit"
            className="w-full !bg-orange-400 text-black py-3 rounded-lg font-semibold transition-all duration-300 hover:!bg-orange-460 shadow-md"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Sign Up / Login */}
        <p className="mt-5 text-gray-700 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={handleToggle}
            className="text-green-600 cursor-pointer font-bold hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

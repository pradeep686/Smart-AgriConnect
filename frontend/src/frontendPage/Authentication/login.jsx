import { useState } from "react";

const AuthPage = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [resetData, setResetData] = useState({ username: "", currentPassword: "", newPassword: "" });
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setIsResetPassword(false);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
  };

  const handleResetToggle = () => {
    setIsResetPassword(!isResetPassword);
    setIsSignUp(false);
    setResetData({ username: "", currentPassword: "", newPassword: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isSignUp ? "Signed Up" : "Logged In"} successfully!`);
    onClose();
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    alert("Password Reset Successfully!");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login2.jpeg')" }}
    >
      <div className="relative bg-white shadow-xl rounded-2xl w-96 border-2 border-green-500">
        <div className="h-40 bg-cover bg-center rounded-t-2xl" style={{ backgroundImage: "url('/images/login.jpg')" }}></div>

        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 !bg-orange-400 text-white w-8 h-8 flex items-center justify-center rounded-full hover:!bg-orange-500 transition-all"
          >
            ✖
          </button>

          <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">
            {isResetPassword ? "Reset Password" : isSignUp ? "Create Account" : "Welcome Back"}
          </h2>

          {!isResetPassword ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              {/* Username */}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
                required
              />

              {/* Email (Only for Sign Up) */}
              {isSignUp && (
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
                  required
                />
              )}

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 pr-12"
                  required
                />
                <span
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold cursor-pointer hover:underline"
                >
                  {showPassword.password ? "Hide" : "Show"}
                </span>
              </div>

              {/* Confirm Password (Only for Sign Up) */}
              {isSignUp && (
                <div className="relative">
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300 pr-12"
                    required
                  />
                  <span
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-600 font-bold cursor-pointer hover:underline"
                  >
                    {showPassword.confirmPassword ? "Hide" : "Show"}
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="w-full !bg-orange-400 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:!bg-orange-500 shadow-md"
              >
                {isSignUp ? "Sign Up" : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetSubmit} className="flex flex-col space-y-5">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={resetData.username}
                onChange={handleResetChange}
                className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
                required
              />

              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={resetData.currentPassword}
                onChange={handleResetChange}
                className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
                required
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={resetData.newPassword}
                onChange={handleResetChange}
                className="w-full p-3 rounded-lg border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-300"
                required
              />

              <button
                type="submit"
                className="w-full !bg-orange-400 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:!bg-orange-500 shadow-md"
              >
                Reset Password
              </button>
            </form>
          )}

          {!isResetPassword && (
            <p className="mt-5 text-gray-700 text-center">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <span onClick={handleToggle} className="text-green-600 cursor-pointer font-bold hover:underline">
                {isSignUp ? "Login" : "Sign Up"}
              </span>
            </p>
          )}

          <p className="mt-3 text-gray-700 text-center">
            <span onClick={handleResetToggle} className="text-red-600 cursor-pointer font-bold hover:underline">
              {isResetPassword ? "Back to Login" : "Forgot Password?"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

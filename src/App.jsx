import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/homePage/homePage";
import Navbar from "./pages/navbar";
import Subsidies from "./pages/subsidiesPage/subsidies";
import CropInsight from "./pages/cropInsigthtPage/cropInsight";
import CropProtect from "./pages/cropProtect";
import Weather from "./pages/weather";
import TradeHub from "./pages/tradHub";
import Discussion from "./pages/discussion";
import Feedback from "./pages/feedBack";
import AuthPage from "./pages/Authentication/login";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Router>
      <AppContent showLogin={showLogin} setShowLogin={setShowLogin} />
    </Router>
  );
}

// Conditional Layout Handling
function AppContent({ showLogin, setShowLogin }) {
  const location = useLocation();

  return (
    <div className="flex">
      {/* Sidebar Navbar */}
      <Navbar onLoginClick={() => setShowLogin(true)} />

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/subsidies" element={<Subsidies />} />
          <Route path="/crop-insight" element={<CropInsight />} />
          <Route path="/crop-protect" element={<CropProtect />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/trade-hub" element={<TradeHub />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>

      {/* Login Modal (Improved Close Button Handling) */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white shadow-xl rounded-2xl p-8 w-96 border-2 border-green-500">
            {/* Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-700 transition-all"
            >
              ✖
            </button>

            {/* Authentication Component */}
            <AuthPage onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

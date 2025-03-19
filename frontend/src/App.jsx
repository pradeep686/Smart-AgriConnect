import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./frontendPage/homePage/homePage";
import SignUpPage from "./frontendPage/Authentication/SignUpPage";
import ResetPasswordPage from "./frontendPage/Authentication/ResetPasswordPage";
import Navbar from "./frontendPage/navbarPage/navbar";
import Subsidies from "./frontendPage/subsidiesPage/subsidies";
import CropInsight from "./frontendPage/cropInsigthtPage/cropInsight";
import CropProtect from "./frontendPage/cropProtectPage/cropProtect";
import Weather from "./frontendPage/weatherPage/weather";
import TradeHub from "./frontendPage/tradeHubPage/tradHub";
import Discussion from "./frontendPage/discussionPage/discussion";
import Feedback from "./frontendPage/feedBackPage/feedBack";
import Login from "./frontendPage/Authentication/login";
import UserProfile from "./frontendPage/userProfile";
function App() {
  return (
    <Router>
      {/* Keep Navbar outside of Routes for global access */}
      <Navbar />

      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/subsidies" element={<Subsidies />} />
          <Route path="/crop-insight" element={<CropInsight />} />
          <Route path="/crop-protect" element={<CropProtect />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/trade-hub" element={<TradeHub />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path='/userProfile' element={<UserProfile/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

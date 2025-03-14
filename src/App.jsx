import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";
import Navbar from "./pages/navbar";
import Subsidies from "./pages/subsidies";
import CropInsight from "./pages/cropInsigthtPage/cropInsight";
import CropProtect from "./pages/cropProtect";
import Weather from "./pages/weather";
import TradeHub from "./pages/tradHub";
import Discussion from "./pages/discussion";
import Feedback from "./pages/feedBack";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Left Sidebar */}

        <Navbar />
        

        {/* Right Content */}
        <div className="flex-1 p-10 bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/homepage" element = {<HomePage/>} />
            <Route path="/subsidies" element={<Subsidies />} />
            <Route path="/crop-insight" element={<CropInsight />} />
            <Route path="/crop-protect" element={<CropProtect />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/trade-hub" element={<TradeHub />} />
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

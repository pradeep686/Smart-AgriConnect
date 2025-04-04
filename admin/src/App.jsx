import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./administrator Page/AdminLogin";
import Navbar from "./administrator Page/Navbar";
import AddSubsidies from "./administrator Page/subsidies/AddSubsidies";
import "./index.css";
import ShowSubsidies from "./administrator Page/subsidies/ShowSubsidies";
import AddCropInsights from "./administrator Page/cropInsightes/AddCropInsights";
import ViewCropInsight from "./administrator Page/cropInsightes/ViewCropInsight";
import AddPesticides from "./administrator Page/pesticides/AddPesticides";
import ViewPesticides from './administrator Page/pesticides/ViewPesticides';
import AddFertilizers from "./administrator Page/fertilizer/AddFertilizer"
import ViewFertilizer from "./administrator Page/fertilizer/ViewFertilizer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<AdminLogin />} />

        {/* Wrap all other admin pages inside Navbar */}
        <Route path="/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

function AdminLayout() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 ml-72 p-10 bg-green-50 min-h-screen overflow-y-auto">
        <Routes>
          <Route path="/all-subsidies" element={<ShowSubsidies/>}/>
          <Route path="/add-subsidies" element={<AddSubsidies />} />
          <Route path="/add-cropinsigts" element={<AddCropInsights/>}/>
          <Route path="/view-crop-insights" element={<ViewCropInsight/>}/>
          <Route path="/add-pesticides" element={<AddPesticides/>}/>
          <Route path="/view-pesticides" element={<ViewPesticides/>}/>
          <Route path="/add-fertilizer" element={<AddFertilizers/>}/>
          <Route path="/view-fertilizers" element={<ViewFertilizer/>}/>
          {/* Add more admin routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./administrator Page/AdminLogin";
import Navbar from "./administrator Page/Navbar";
import AddSubsidies from "./administrator Page/AddSubsidies";
import "./index.css";
import ShowSubsidies from "./administrator Page/ShowSubsidies";

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
          {/* Add more admin routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminLogin from "./administrator Page/AdminLogin";
import Navbar from "./administrator Page/Navbar";
import AddSubsidies from "./administrator Page/AddSubsidies";
import "./index.css";
function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="add-subsidies" element={<AddSubsidies/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminLogin from "./administrator Page/AdminLogin";
import Navbar from "./administrator Page/Navbar";
import "./index.css";
function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<AdminLogin />} />
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

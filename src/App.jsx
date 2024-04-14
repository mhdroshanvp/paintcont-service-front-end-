import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Pages/Admin/AdminLogin";
import ClientLogin from "./Pages/Clients/ClientLogin";
import ClientSignUp from "./Pages/Clients/ClientSignUp";
import PainterLogin from "./Pages/Painters/PainterLogin";
import PainterSignup from "./Pages/Painters/PainterSignup";
import ClientOtp from "./Pages/Clients/ClientOtp";
import ClientResetPass from "./Pages/Clients/ClientResetPass";
import PainterOtp from "./Pages/Painters/PainterOtp";
import PainterResetPass from "./Pages/Painters/PainterResetPass";
import ClientHome from "./Pages/Clients/ClientHome";
import ClientProfile from "./Pages/Clients/ClientProfile";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import PainterHome from "./Pages/Painters/PainterHome";
import PainterProfile from "./Pages/Painters/PainterProfile";
import AdminUser from "./Pages/Admin/AdminUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Admin-side */}
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/user" element={<AdminUser />} />
          {/* Client/user-side */}
          <Route path="user/home" element={<ClientHome />} />
          <Route path="user/login" element={<ClientLogin />} />
          <Route path="user/signup" element={<ClientSignUp />} />
          <Route path="user/otp" element={<ClientOtp />} />
          <Route path="user/reset" element={<ClientResetPass />} />
          <Route path="user/profile" element={<ClientProfile />} />
          {/* Painter-side */}
          <Route path="painter/home" element={<PainterHome />} />
          <Route path="painter/login" element={<PainterLogin />} />
          <Route path="painter/signup" element={<PainterSignup />} />
          <Route path="painter/otp" element={<PainterOtp />} />
          <Route path="painter/reset" element={<PainterResetPass />} />
          <Route path="painter/profile" element={<PainterProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
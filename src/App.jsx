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
import PainterHome from "./Pages/Painters/PainterHome";
import PainterProfile from "./Pages/Painters/PainterProfile";
import AdminUser from "./Pages/Admin/AdminUser";
import LandingPage from "./Pages/LandingPage";
import PainterMail4Reset from "./Pages/Painters/PainterMail4Reset";
import NotFoundPage from "./Pages/404";
import AdminPainter from "./Pages/Admin/AdminPainter";
import ClientPainterProfile from "./Pages/Clients/ClientPainterProfile";
import ClientMail4Reset from "./Pages/Clients/ClientMail4Reset";

import AdmnProtectedRoute from "./Components/adminProtectedRoute";
import PainterProtectedRoute from "./Components/painterProtectedRoute";
import UserProtectedRoute from "./Components/userProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./Pages/Common/Messages/Messages";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    
                    
                    {/* Exxxtra */}
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<LandingPage />} />

                    {/* Admin-side */}
                    <Route path="admin/login" element={<AdminLogin />} />
                    <Route path="admin/user" element={<AdmnProtectedRoute allowedRole="admin"><AdminUser /></AdmnProtectedRoute>} />
                    <Route path="admin/painter" element={<AdmnProtectedRoute allowedRole="admin"><AdminPainter /></AdmnProtectedRoute>} />

                    {/* Client/user-side */}
                    <Route path="user/home" element={<UserProtectedRoute allowedRole="user"><ClientHome /></UserProtectedRoute>} />
                    <Route path="user/login" element={<ClientLogin />} />
                    <Route path="user/signup" element={<ClientSignUp />} />
                    <Route path="user/mail4reset" element={<ClientMail4Reset />} />
                    <Route path="user/otp" element={<ClientOtp />} />
                    <Route path="user/reset" element={<ClientResetPass />} />
                    <Route path="user/profile" element={<UserProtectedRoute allowedRole="user"><ClientProfile /></UserProtectedRoute>} />
                    <Route path="user/painter/profile/:id" element={<UserProtectedRoute allowedRole="user"><ClientPainterProfile /></UserProtectedRoute>} />
                    <Route path="user/chat/:id" element={<UserProtectedRoute allowedRole="user"> <Message /> </UserProtectedRoute>} />
                    <Route path="user/chat/" element={<UserProtectedRoute allowedRole="user"> <Message /> </UserProtectedRoute>} />

                    {/* Painter-side */}
                    <Route path="painter/home" element={<PainterProtectedRoute allowedRole="painter"><PainterHome /></PainterProtectedRoute>} />
                    <Route path="painter/login" element={<PainterLogin />} />
                    <Route path="painter/signup" element={<PainterSignup />} />
                    <Route path="painter/mail4reset" element={<PainterMail4Reset />} />
                    <Route path="painter/otp" element={<PainterOtp />} />
                    <Route path="painter/reset" element={<PainterResetPass />} />
                    <Route path="painter/profile" element={<PainterProtectedRoute allowedRole="painter"><PainterProfile /></PainterProtectedRoute>} />
                
                
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;

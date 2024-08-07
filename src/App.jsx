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
import MessagesPainter from "./Pages/Common/Messages/MessagesPainter";
import PainterSlotAdd from "./Pages/Painters/PainterSlotAdd";
import AdminPostHandle from "./Pages/Admin/AdminPostHandle";
import ClientAboutPage from "./Pages/Clients/ClientAboutPage";
import ClientSuccessPage from "./Pages/Clients/ClientSuccessPage";
import ClientContact from "./Pages/Clients/ClientContact";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import PainterDashboard from "./Pages/Painters/PainterDashboard";
import ClientFailurePage from "./Pages/Clients/ClientFailurePage";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    
                    
                    {/* Exxxtra */}
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/error" element={<NotFoundPage />} />
                    <Route path="/" element={<LandingPage />} />

                    {/* Admin-side */}
                    <Route path="admin/login" element={<AdminLogin />} />
                    <Route path="admin/user" element={<AdmnProtectedRoute allowedRole="admin"><AdminUser /></AdmnProtectedRoute>} />
                    <Route path="admin/painter" element={<AdmnProtectedRoute allowedRole="admin"><AdminPainter /></AdmnProtectedRoute>} />
                    <Route path="admin/posts" element={<AdmnProtectedRoute allowedRole="admin"><AdminPostHandle /></AdmnProtectedRoute>} />
                    <Route path="admin/dashboard" element={<AdmnProtectedRoute allowedRole="admin"><AdminDashboard /></AdmnProtectedRoute>} />

                    {/* Client/user-side */}
                    <Route path="user/home" element={<UserProtectedRoute allowedRole="user"><ClientHome /></UserProtectedRoute>} />
                    <Route path="user/about" element={<UserProtectedRoute allowedRole="user"><ClientAboutPage /></UserProtectedRoute>} />
                    <Route path="user/contact" element={<UserProtectedRoute allowedRole="user"><ClientContact /></UserProtectedRoute>} />
                    <Route path="user/login" element={<ClientLogin />} />
                    <Route path="user/signup" element={<ClientSignUp />} />
                    <Route path="user/mail4reset" element={<ClientMail4Reset />} />
                    <Route path="user/otp" element={<ClientOtp />} />
                    <Route path="user/reset" element={<ClientResetPass />} />
                    <Route path="user/profile" element={<UserProtectedRoute allowedRole="user"><ClientProfile /></UserProtectedRoute>} />
                    <Route path="user/painter/profile/:id" element={<UserProtectedRoute allowedRole="user"><ClientPainterProfile /></UserProtectedRoute>} />
                    <Route path="user/chat/:id" element={<UserProtectedRoute allowedRole="user"> <Message /> </UserProtectedRoute>} />
                    <Route path="user/chat/" element={<UserProtectedRoute allowedRole="user"> <Message /> </UserProtectedRoute>} />
                    <Route path="user/payment-success" element={<UserProtectedRoute allowedRole="user"> <ClientSuccessPage /> </UserProtectedRoute>} />
                    <Route path="user/payment-failure" element={<UserProtectedRoute allowedRole="user"> <ClientFailurePage /> </UserProtectedRoute>} />

                    {/* Painter-side */}
                    <Route path="painter/home" element={<PainterProtectedRoute allowedRole="painter"><PainterHome /></PainterProtectedRoute>} />
                    <Route path="painter/dashboard" element={<PainterProtectedRoute allowedRole="painter"><PainterDashboard /></PainterProtectedRoute>} />
                    <Route path="painter/login" element={<PainterLogin />} />
                    <Route path="painter/signup" element={<PainterSignup />} />
                    <Route path="painter/mail4reset" element={<PainterMail4Reset />} />
                    <Route path="painter/otp" element={<PainterOtp />} />
                    <Route path="painter/reset" element={<PainterResetPass />} />
                    <Route path="painter/profile" element={<PainterProtectedRoute allowedRole="painter"><PainterProfile /></PainterProtectedRoute>} />
                    <Route path="painter/chat" element={<PainterProtectedRoute allowedRole="painter"> <MessagesPainter /> </PainterProtectedRoute>} />
                    <Route path="painter/slot" element={<PainterProtectedRoute allowedRole="painter"> <PainterSlotAdd /> </PainterProtectedRoute>} />
                
                
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;

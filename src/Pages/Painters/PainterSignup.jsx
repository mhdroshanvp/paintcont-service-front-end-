import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import axios from "../../Services/axiosService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PainterEndpoints } from "../../Services/endpoints/painter";

function PainterSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formsubmit = async (e) => {
    e.preventDefault();
  
    // Validate and prepare the form data
    let validatedUsername = username.trim().replace(/ /g, "").toLowerCase();
    let validatedEmail = email.trim();
    let validatedPassword = password.trim();
  
    // Check if any field is filled with spaces only
    if (!validatedUsername ||!validatedEmail ||!validatedPassword) {
      toast.error("Fields cannot be empty");
      return;
    }
  
    // Check if password is exactly 8 characters long
    if (validatedPassword.length <= 8) {
      toast.error("Password must be exactly 8 characters long.");
      return;
    }
  
    const body = {
      username: validatedUsername,
      email: validatedEmail,
      password: validatedPassword,
    };
  
    try {
      console.log("Sending body:", body);
      const response = await axios.post(PainterEndpoints.Signup, body);
  
      if (response.data.success) {
        navigate('/painter/otp', { state: { userEmail: validatedEmail } });
        console.log("ok😌👍");
      }
    }catch (error) {
      console.log("error while sending otp req");
      toast.error(error.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="sm:w-[400px] w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h5 className="text-white flex justify-center font-serif text-2xl">Painter</h5>
          <h2 className="text-white text-center mb-8 font-serif text-4xl">
            Sign-Up
          </h2>
          <form>
            <div className="relative mb-6">
              <input
                type="text"
                id="username"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label
                htmlFor="username"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
                  username ? "text-sm -translate-y-4" : "text-base"
                }`}
              >
                Username
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type="email"
                id="email"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="email"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
                  email ? "text-sm -translate-y-4" : "text-base"
                }`}
              >
                Email
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="password"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
                  password ? "text-sm -translate-y-4" : "text-base"
                }`}
              >
                Password
              </label>
              <div className="flex w-full justify-center mt-3 text-sm">
                <a
                onClick={() => navigate("/painter/login")}
                className="cursor-pointer text-slate-400" 
                >
                  already have an account? Sign-in
                </a>
              </div>
            </div>
            <button className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg" onClick={formsubmit}>submit</button>
            <div className="flex w-full justify-center text-sm mt-2h">
                <a
                onClick={() => navigate("/user/login")}

                className="cursor-pointer text-slate-400 text-sm" >
                  Join as a User Click here
                </a>
              </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PainterSignup;

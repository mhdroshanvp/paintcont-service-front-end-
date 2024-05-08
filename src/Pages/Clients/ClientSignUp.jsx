import React, { useState } from "react";
import axios from "../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserEndpoints } from "../../Services/endpoints/user";
import GoogleAuthSignup from "../../Components/Goog";

function ClientSignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formsubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username, "===usernmae", email, "maill", password, "passsss");
      const response = await axios.post(UserEndpoints.SignUp, {
        username,
        email,
        password,
      });

      if (response.data.success) {
        navigate("/user/otp", {
          state: {
            userEmail: email,
          },
        });
      }
    } catch (error) {
      console.log("Error while signing up:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      {/* Add Toaster component for displaying toast notifications */}
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-white text-center mb-8 font-serif text-4xl">User Sign-Up</h2>
          <form>
            <div className="relative mb-6">
              <input
                type="text"
                id="username"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update the username state here
                required
              />
              <label
                htmlFor="username"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${username ? "text-sm -translate-y-4" : "text-base"}`}
              >
                Usernanme
              </label>
            </div>

            <div className="relative mb-6">
              <input
                type="email"
                id="email"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update the email state here
                required
              />
              <label
                htmlFor="email"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${email ? "text-sm -translate-y-4" : "text-base"}`}
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
                onChange={(e) => setPassword(e.target.value)} // Update the password state here
                required
              />
              <label
                htmlFor="password"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${password ? "text-sm -translate-y-4" : "text-base"}`}
              >
                Password
              </label>
              <div className="flex w-full justify-center p-2 space-x-2">
                <span className="text-white opacity-10 text-sm">Already have an account?</span>
                <a href="/user/login" className="text-sm text-white opacity-10"> Sign-in</a>
              </div>
            </div>

            <button
              onClick={formsubmit}
              className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg"
            >
              Sign-Up
            </button>
            <GoogleAuthSignup />
            <div className="flex w-full justify-center p-2 space-x-2">
              <span className="text-white opacity-10 text-sm">Interested in joining our team?</span>
              <a href="/painter/signup" className="text-sm text-white opacity-10"> Click Here</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientSignUp;

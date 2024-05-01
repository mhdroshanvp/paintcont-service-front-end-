import { propTypesRatedIcon } from "@material-tailwind/react/types/components/rating";
import { Axios } from "axios";
import React, { useState } from "react";
import axios from "../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import { PainterEndpoints } from "../../Services/endpoints/painter";



function PainterSignup() {

  
  const navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [body, setBody] = useState({
    Busername: "",
    Bemail: "",
    Bpassword: "",
  });

  const formsubmit = async (e) => {
    
    setBody({
      username,
      email,
      password,
    });
    e.preventDefault();

    try {
      console.log(body);
      console.log("username", username, "email", email, "password", password);
      const response = await axios.post(PainterEndpoints.Signup, {username,email,password});
      if (response.data.success) {
        navigate('/painter/otp', { state: { userEmail: email } });
        console.log("ok😌👍");
      }
    } catch (error) {
      console.log("error while sending otp req");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-white text-center mb-8 font-serif text-4xl">
            Painter Sign-Up
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
                Fullname
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
              <div className="flex w-full justify-center p-2 space-x-2">
                <span className="text-white opacity-10 text-sm">
                  already have an account?{" "}
                </span>
                <a
                  href="/painter/login"
                >
                  {" "}
                  Sign-In
                </a>
              </div>
            </div>
            {/* <a href="#" className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg">
                 Submit
               </a> */}
            <button className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg" onClick={(e) => formsubmit(e)}>submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PainterSignup;

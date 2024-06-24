  import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../Services/axiosService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminEndpoints } from "../../Services/endpoints/admin";


function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("admin_token")

    if(token){
      navigate('/admin/dashboard')
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }
  
    try {
      dispatch(signInStart());
      const response = await axios.post(AdminEndpoints.login, { username, password });
      const data = response.data;
  
      if (!data.success) {
        toast.error(data.message);
        dispatch(signInFailure(data.message));
      } else {
        localStorage.setItem("admin_token", data.token);
        dispatch(signInSuccess(data.user));
        toast.success('Login successful!');
        navigate("/admin/dashboard");
      }
    } catch (error) {
      toast.error('wrong credential. Please try again later.');
      dispatch(signInFailure('wrong credential. Please try again later.'));
      console.error("Login error:", error);
    }
  }
  

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-white text-center mb-8 font-serif text-4xl">
            Hey Admin:
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-6">
              <input
                type="text"
                id="username"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
              <label
                htmlFor="username"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
                  username ? "text-sm -translate-y-4 scale-75" : ""
                }`}
              >
                Username
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <label
                htmlFor="password"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
                  password ? "text-sm -translate-y-4 scale-75" : ""
                }`}
              >
                Password
              </label>
            </div>
            <button type="submit" className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;

import React, { useState,useEffect } from 'react';
import axios from '../../Services/axiosService'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../Redux/user/userSlice";
import { useNavigate } from 'react-router-dom';
import { PainterEndpoints } from '../../Services/endpoints/painter';
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';


function PainterLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(()=>{
    const token = localStorage.getItem("Painter_token")

    if(token){
      navigate('/painter/home')
    }
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() && !password.trim()) {
      toast.error("Please enter username and password.");
      return;
    }

    if (!username.trim()) {
      toast.error("Username required");
      return;
    }

    if (!password.trim()) {
      toast.error("Password required");
      return;
    }

    try {
      dispatch(signInStart());
      const response = await axios.post(PainterEndpoints.Login, { username, password });

      if (response.status === 200) {
        if (response.data.success) {
          const data = response.data;
          if (data?.painter?.isBlocked) {
            toast.error("Your account is blocked. Please contact support.");
          } else {
            localStorage.setItem("Painter_token", data.token);
            dispatch(signInSuccess(data.painter));
            navigate("/painter/home");
          }
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      } else {
        console.error('Login request failed:', response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login failed. Please try again later.");
    }
  };


  const forgetPass = async (e) => {
    e.preventDefault()

    try {
      navigate('/painter/mail4reset')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <Toaster />

      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-white text-center mb-8 font-serif text-4xl">Painter Login</h2>
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
                className="absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-sm"
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
                className="absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 text-sm"
              >
                Password
              </label>
            </div>
            <div className="flex justify-end mb-4">
                <a onClick={forgetPass} target="_blank" className="text-sm text-slate-500">forget password</a>
            </div>
            <button type="submit" className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg">
              Submit
            </button>
          </form>
          <div className="flex w-full justify-center p-2 space-x-2">
            <span className="text-slate-400 text-sm">Don't have an account?</span>

            <Link to={'/painter/signup'} className="text-sm text-slate-400">
              Sign-up
          </Link>

          </div>
            <Link to={'/user/login'} className="flex justify-center text-sm text-slate-400">
              Login as a User
          </Link>
        </div>
      </div>
    </>
  );
}

export default PainterLogin;

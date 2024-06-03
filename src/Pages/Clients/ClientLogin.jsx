import React, { useState,useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import { UserEndpoints } from "../../Services/endpoints/user";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../Redux/user/userSlice";

function ClientLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem("token")

    if(token){
      navigate('/user/home')
    }
  },[])

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
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

    // Clean and convert username to lowercase
    const cleanedUsername = username.replace(/\s+/g, '').toLowerCase();

    try {
      const response = await axios.post(UserEndpoints.login, { username: cleanedUsername, password });
      console.log(response.data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        dispatch(signInSuccess(response.data.user));
        navigate("/user/home");
      } else {
        toast.error("Username or password is incorrect");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Wrong credentials, try again :(");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[400px]    p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-white text-center mb-8 font-serif text-4xl">
              User Login
          </h2>
          <form onSubmit={handleLogin}>
            <div className="relative mb-6">
              <input 
                type="text"
                id="username"
                className={`block w-full p-2 text-white border-b border-white outline-none bg-transparent peer ${usernameFocus || username ? "pt-6" : ""}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              <label
                htmlFor="username"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${ usernameFocus || username ? "text-xs" : "text-sm"}`}
              >
                Username
              </label>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                className={`block w-full p-2 text-white border-b border-white outline-none bg-transparent peer ${passwordFocus || password ? "pt-6" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <label
                htmlFor="password"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${passwordFocus || password ? "text-xs" : "text-sm"}`}
              >
                Password
              </label>
              <div className="flex w-full justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/user/mail4reset")}
                  className="text-sm text-slate-400 mt-2 "
                >
                  forget password
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg"
            >
              Submit
            </button>
            <div className="flex w-full justify-center p-2 space-x-2">
              <button
                type="button"
                onClick={() => navigate('/painter/signup')}
                className="text-slate-500 text-sm"
              >
                Don't have an account?
              </button>
              <button
                type="button"
                onClick={() => navigate('/user/signup')}
                className="text-sm text-slate-500"
              >
                Sign-up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientLogin;

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../Services/axiosService";
import { useNavigate } from "react-router-dom";
import { UserEndpoints } from "../../Services/endpoints/user";

function ClientLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    try {
      const response = await axios.post(UserEndpoints.login, { username, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/user/home");
      } else {
        window.alert(response.data.message);
      }
      throw new Error("Username or password is incorrect");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message); // Display error message as toast notification
    }
  };

  return (
    <>
      <Toaster />{" "}
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <h2 className="text-white text-center mb-8 font-serif text-4xl">
            User Login
          </h2>
          <form onSubmit={handleLogin}>
            {" "}
            <div className="relative mb-6">
              <input
                type="text"
                id="username"
                className={`block w-full p-2 text-white border-b border-white outline-none bg-transparent peer ${
                  usernameFocus || username ? "pt-6" : ""
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              <label
                htmlFor="username"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                  usernameFocus || username ? "text-xs" : "text-sm"
                }`}
              >
                Username
              </label>
            </div>
            {/* Password input */}
            <div className="relative mb-6">
              <input
                type="password"
                id="password"
                className={`block w-full p-2 text-white border-b border-white outline-none bg-transparent peer ${
                  passwordFocus || password ? "pt-6" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <label
                htmlFor="password"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
                  passwordFocus || password ? "text-xs" : "text-sm"
                }`}
              >
                Password
              </label>
              {/* Forgot password link */}
              <div className="flex w-full justify-end">
                <a
                  href="/user/mail4reset"
                  className="text-sm text-white opacity-10"
                >
                  forget password
                </a>
              </div>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg"
            >
              Submit
            </button>
            {/* Sign-up link */}
            <div className="flex w-full justify-center p-2 space-x-2">
              <span className="text-white opacity-10 text-sm">
                Don't have an account?
              </span>
              <a
                href="/user/signup"
                className="text-sm text-white opacity-10"
              >
                {" "}
                Sign-up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientLogin;

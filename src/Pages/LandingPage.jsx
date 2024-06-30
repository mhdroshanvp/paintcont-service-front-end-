import React from "react";
import animatedLogo from "../assets/paintcont-service-3.gif";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center text-center text-white p-8 sm:p-16 lg:p-24 xl:p-40 rounded-lg">
       <Link to={"/user/login"}>
        <div  className="p-4 bg-gradient-to-r from-purple-500 to-red-700 hover:from-yellow-600 hover:to-blue-800 transition-transform duration-150 transform hover:scale-110 animate-pulse rounded-lg">
          <div className="flex justify-center transition-transform duration-500 hover:scale-105">
            <img
              src={animatedLogo}
              alt="Borcelle"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-[25px]"
            />
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;

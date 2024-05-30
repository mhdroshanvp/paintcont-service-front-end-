import React, { useEffect, useState } from "react";
import axios from "../../Services/axiosService";
import { PainterEndpoints } from "../../Services/endpoints/painter";
import PainterNavbar from "../../Components/Painters/PainterNavbar";
import painterGIf from "../../assets/painter-gif.gif"
import { Link } from "react-router-dom";

function ClientHome() {
  return (
    <>
      <div className="w-full h-screen block">
        
        <div className="w-full h-[60px] ">
          <PainterNavbar />
        </div>

        {/* <div className="flex justify-center items-center mt-[30px] bg-black">
          <div className="w-[1000px] h-[470px] bg-white  rounded-[60px] flex justify-center items-center ">
            <div className="ml-28">
              <img src={painterGIf} className="rounded-[60px]" alt="GIF Description" />
            </div>
          </div>
        </div> */}

<div className="flex justify-center items-center mt-[70px] ">
  <div className="w-[1000px] h-[400px] bg-gradient-to-r from-[#2f1046] to-[#25195e] rounded-[60px] flex items-center p-10">
    <div className="ml-5 flex-shrink-0 transition-opacity duration-300 hover:opacity-65">
      <img src={painterGIf} className="h-[300px] rounded-[60px]" alt="GIF Description" />
    </div>
    <div className="flex flex-col justify-end pl-10">
      <p className="text-xl font-semibold mb-4 text-white">
        "Every wall is a canvas, and every painter is an artist."
      </p>
      <p className="text-lg font-medium mb-4 text-white">
        Discover the world of wall painting through the eyes of a talented painter. Explore your profile...
      </p>
      <Link to="/painter/profile" className="text-white">
      <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-700 hover:border-[2px] hover:border-yellow-500 transition duration-300">
        Set-Up Painter Profile
      </button>
  </Link>

    </div>
  </div>
</div>






      </div>
    </>
  );
}

export default ClientHome;
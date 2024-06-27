import React from "react";
import axios from "../../Services/axiosService";
import { PainterEndpoints } from "../../Services/endpoints/painter";
import PainterNavbar from "../../Components/Painters/PainterNavbar";
import painterGIf from "../../assets/painter-gif.gif";
import { Link } from "react-router-dom";

function ClientHome() {
  return (
    <>
      <div className="w-full h-screen">
        <div className="w-full h-[60px]">
          <PainterNavbar />
        </div>

        <div className="flex justify-center items-center mt-10 md:mt-20 px-4 md:px-0">
          <div className="w-full md:w-[1300px] h-auto md:h-[450px] bg-gradient-to-r from-[#2f1046] to-[#25195e] rounded-2xl md:rounded-[60px] flex flex-col md:flex-row items-center p-6 md:p-10 mt-14 sm:mt-7">
            <div className="mb-6 md:mb-0 md:mr-10 flex-shrink-0 transition-opacity duration-300 hover:opacity-65">
              <img
                src={painterGIf}
                className="w-full md:w-auto h-[200px] md:h-[300px] rounded-2xl md:rounded-[60px]"
                alt="GIF Description"
              />
            </div>
            <div className="flex flex-col justify-center md:justify-end md:pl-10 text-center md:text-left">
              <p className="text-lg md:text-xl font-semibold mb-4 text-white">
                "Every wall is a canvas, and every painter is an artist."
              </p>
              <p className="text-base md:text-lg font-medium mb-4 text-white">
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

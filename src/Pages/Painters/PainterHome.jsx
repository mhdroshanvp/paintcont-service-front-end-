import React, { useEffect, useState } from "react";
import axios from "../../Services/axiosService";
import { PainterEndpoints } from "../../Services/endpoints/painter";
import PainterNavbar from "../../Components/Painters/PainterNavbar";

function ClientHome() {
  return (
    <>
      <div className="w-full h-screen block">
        
        <div className="w-full h-[60px] ">
          <PainterNavbar />
        </div>

        <div className="flex justify-center items-center mt-[30px]">
          <div className="w-[1000px] h-[470px] bg-white mx-auto rounded-[60px] flex justify-between items-center">
            <img src="https://www.360ss.com/360/uploads/f35efdb2aa6e9a42668a3259b86fc8de.gif" className="w-[626px] rounded-[60px]" alt="GIF Description" />
            <button className="mr-80 rounded-[20px] bg-blue-500 text-white py-2 px-4 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 hover:bg-blue-700">heheheheh</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientHome;
import React from "react";
import borcelleImage from "../assets/PAINTCONT-removebg-preview.png";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center border text-white p-8 lg:p-16 xl:p-32">

        <div className="flex justify-center">
          <img
            src={borcelleImage}
            alt="Borcelle"
            className="xl:w-120 lg:w-80 md:w-64 sm:w-56 xm:w-60"
          />
        </div>

        <div>
          "Transform your space with the stroke of a brush. Our wall painting
          service breathes life into your walls, turning them into canvases of
          color and creativity"
        </div>

        <div className="text-white mt-4">
          <a href="/user/login" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Get Started</a>

        </div>
      </div>
    </div>
  );
}

export default LandingPage;
import React from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";

function ClientProfile() {
  return (
    <>
      <ClientNavbar />
      <div className="flex flex-col items-center justify-center pt-16">
        <div className="flex flex-col items-center bg-gradient-to-br from-purple-950 to-purple-950 rounded-3xl shadow-2xl p-8 h-96 w-96">
          <div className="bg-purple-900 rounded-full overflow-hidden w-24 h-24 mb-4">
            <img
              src="/profileIcon.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Muhammed Roshan vp"
              className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64"
            />
            <input
              type="email"
              placeholder="roshanvp2004@gmail.com"
              className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64"
            />
            <input
              type="text"
              placeholder="Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522(257) 563-7401"
              className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64"
            />
            <div className="flex justify-center align-middle">
            <button className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-20">Save</button>
            <button className="bg-purple-900 text-white border-b-2 ml-1 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-50">Transaction History</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientProfile;
  
import React from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import ClientCard from "../../Components/Clients/ClientCard";
import ClientVIP from "../../Components/Clients/ClientVIP";
import ClientHash from "../../Components/Clients/ClientHash";
import ClientPosts from "../../Components/Clients/ClientPosts";

function ClientHome() {
  return (
    <>
      <ClientNavbar />
      <div className="flex  flex-col sm:flex-row h-screen">
        <div className="fixed flex-initial w-full sm:w-96 bg-blue-500 h-screen  mt-14">
          <ClientCard />
          <ClientHash />
        </div>
        <div className="flex-1 bg-green-500">
          <ClientPosts />
        </div>
      </div>
    </>
  );
}

export default ClientHome;

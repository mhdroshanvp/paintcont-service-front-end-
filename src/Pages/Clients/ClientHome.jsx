import React from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import ClientCard from "../../Components/Clients/ClientCard";
import ClientVIP from "../../Components/Clients/ClientVIP";
import ClientHash from "../../Components/Clients/ClientHash";
import ClientPosts from "../../Components/Clients/ClientPosts";

function ClientHome() {
  return (
    <>
      <div className="w-full h-screen">
        <ClientNavbar />
        <div className="h-12 md:h-14"></div>
        <div className=" h-[540px]  w-full  md:flex">
          <div className="md:w-[30%] w-full h-full bg-red-500 ">
            <div className="w-full hidden md:block">
              <ClientCard />
            </div>
            <ClientHash />
          </div>
          <div className=" md:w-[70%] flex flex-col justify-center items-center bg-green-500  overflow-y-auto">
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
            <ClientPosts />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientHome;

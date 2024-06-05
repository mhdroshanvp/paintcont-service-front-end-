import React, { useState } from "react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine, RiLogoutCircleLine } from "react-icons/ri";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

function ClientNavbar({setSmState,smState}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [view,setView] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if(!isOpen) setSmState(false)
  };
  return (
    <nav className="w-full flex flex-col bg-[#572c77] py-3 h-[60px] z-50">

      <div className="flex sm:mt-0 item-center mt-4  justify-between w-full  text-white ">
            <Typography as="a" href="/user/home" variant="h6" className=" sm:absolute -mt-2 w-2/6 sm:mt-1 left-0">
              Paintcont
            </Typography>
         
       
            <div className="flex h-100  items-center justify-end     w-2/6  absolute right-0 ">
              <div className="w-3/6  flex  md:items-center md:gap-3  md:mt-0 justify-end me-3">
                  <Link to="/user/profile" className="text-white me-2">
                    <RiUserLine className="text-lg " />
                  </Link>
                  <button onClick={handleLogout} className="text-white ms-1 ">
                    <RiLogoutCircleLine className="text-lg" />
                  </button>
                </div>

              <div className="flex  w-2/6     items-center -mt-2 md:hidden">
                <button onClick={()=>{toggleMenu()}} className="text-white">
                  {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
              </div>
            </div>
           
      </div>

      <div className={`md:w-full md:flex  md:items-center flex flex-col justify-center md:absolute    ${isOpen ? "block" : "hidden"}`}>
            <div className="flex overflow-hidden w-full md:w-3/6   items-center gap-4 mt-4 md:mt-0">
              <Link to="/user/home" className="text-white md:mr-4">
                Home
              </Link>
              <Link to="/user/painter" className="text-white md:mr-4">
                About Us
              </Link>
              <Link to="/user/chat" className="text-white md:mr-4">
                Chat
              </Link>
              <Link to="/user/designs" className="text-white md:mr-4">
                Contact Us
              </Link>
            </div>
      </div>
    </nav>
  );
}

export default ClientNavbar;

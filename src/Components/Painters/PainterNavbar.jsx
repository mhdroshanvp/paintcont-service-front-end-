import React, { useState } from "react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine, RiLogoutCircleLine } from "react-icons/ri";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

function PainterNavbar({ setSmState, smState }) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Painter_token");
    navigate("/painter/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setSmState(false);
  };

  return (
    <nav className="w-full bg-[#572c77] py-3 h-[70px] z-50">
      <div className="flex justify-between items-center w-full text-white px-4">
        <Typography as="a" href="/painter/home" variant="h6" className="text-lg">
          Paintcont
        </Typography>
        <div className="flex items-center space-x-4 md:hidden">
          <Link to="/painter/profile" className="text-white">
            <RiUserLine className="text-lg" />
          </Link>
          <button onClick={handleLogout} className="text-white">
            <RiLogoutCircleLine className="text-lg" />
          </button>
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={handleLogout} className="text-white">
            <RiLogoutCircleLine className="text-lg" />
          </button>
        </div>
      </div>
      <div className={`md:flex flex-col md:flex-row md:items-center md:justify-end ${isOpen ? "block" : "hidden"} md:block w-full text-white bg-[#572c77] md:bg-transparent`}>
        <div className="flex flex-row  sm:flex-row items-center justify-center w-full">
          <Link to="/painter/home" className="block py-2 px-4 md:py-0 md:px-4">
            Home
          </Link>
          <Link to="/painter/dashboard" className="block py-2 px-4 md:py-0 md:px-4">
            Dashboard
          </Link>
          <Link to="/painter/profile" className="block py-2 px-4 md:py-0 md:px-4">
            Profile
          </Link>
          <Link to="/painter/chat" className="block py-2 px-4 md:py-0 md:px-4">
            Chat
          </Link>
          <Link to="/painter/slot" className="block py-2 px-4 md:py-0 md:px-4">
          Schedule Slots
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default PainterNavbar;

import React, { useState,useEffect} from "react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine, RiLogoutCircleLine } from "react-icons/ri";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import axios from "../../Services/axiosService";

function ClientNavbar({ setSmState, smState }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setSmState(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/user/blockornot');
        if(response.status == 200){
          localStorage.removeItem("token");
          navigate("/user/login");
        }
      } catch (error) {
        console.log(error,"🚒🚒🚒🚒");
      }
    };
    fetchData();
    console.log("Component mounted");
  }, []);

  return (
    <nav className="w-full bg-[#572c77] py-3 h-[70px] z-50">
      <div className="flex justify-between items-center w-full text-white px-4">
        <Typography as="a" href="/user/home" variant="h6" className="text-lg">
          Paintcont
        </Typography>
        <div className="flex items-center space-x-4 md:hidden">
          <Link to="/user/profile" className="text-white">
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
          <Link to="/user/profile" className="text-white">
            <RiUserLine className="text-lg" />
          </Link>
          <button onClick={handleLogout} className="text-white">
            <RiLogoutCircleLine className="text-lg" />
          </button>
        </div>
      </div>
      <div className={`md:flex flex-col md:flex-row md:items-center md:justify-end ${isOpen ? "block" : "hidden"} md:block w-full text-white bg-[#572c77] md:bg-transparent`}>
        <div className="flex flex-row sm:flex-row items-center justify-center w-full">
          <Link to="/user/home" className="block py-2 px-4 md:py-0 md:px-4">
            Home
          </Link>
          <Link to="/user/chat" className="block py-2 px-4 md:py-0 md:px-4">
            Chat
          </Link>
          <Link to="/user/about" className="block py-2 px-4 md:py-0 md:px-4">
            About Us
          </Link>
          <Link to="/user/contact" className="block py-2 px-4 md:py-0 md:px-4">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default ClientNavbar;

import React from "react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine, RiLogoutCircleLine } from "react-icons/ri"; // Importing profile and logout icons
import {Navbar,Typography,IconButton,Button,Input,} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ClientNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <div variant="gradient" color="blue-gray"className="w-full mx-auto from-blue-gray-900 to-blue-gray-800 px-4 py-3 h-[60px] z-50 bg-[#572c77]">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography as="a"href="/user/home"variant="h6"className="mr-4 ml-2 cursor-pointer py-1.5">Paintcont</Typography>

        <div className="flex md:flex flex-wrap gap-4 sm:gap-14 md:mr-4 sm:mr-4">
  {/* Convert text into links */}
  <Link to="/user/home" className="text-white">
    Home
  </Link>
  <Link to="/user/painter" className="text-white">
    Painter
  </Link>
  <Link to="/user/chat" className="text-white">
    Chat
  </Link>
  <Link to="/user/designs" className="text-white">
    Designs
  </Link>
</div>

        <div className="flex items-center w-full sm:w-auto gap-10">
          {/* <Button
            color="white"
            className=" ml-2 p-1 bg-transparent border border-white rounded hover:bg-white hover:text-blue-gray-900 transition duration-300 h-6 text-xm"
          >
            Search
          </Button> */}

          {/* Adding profile and logout icons */}
          <div className="flex items-center gap-3">
            <Link to="/user/profile" className="text-white">
              <RiUserLine className="text-lg" />
            </Link>
            <button onClick={handleLogout} className="text-white">
              <RiLogoutCircleLine className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientNavbar;

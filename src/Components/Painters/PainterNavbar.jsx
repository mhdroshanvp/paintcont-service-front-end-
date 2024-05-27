import {useState} from "react";
import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { RiUserLine, RiLogoutCircleLine } from "react-icons/ri"; // Importing profile and logout icons
import {Navbar,Typography,IconButton,Button,Input,} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function PainterNavbar() {
  
  
  const navigate = useNavigate();
  const [painterId, setPainterId] = useState("");
  
  const handleLogout = () => {
    localStorage.removeItem("Painter_token");
    navigate("/painter/login");
  };
  
  const profileLink = painterId ? `/painter/profile/${painterId}` : "/painter/profile";

  return (
    <div variant="gradient" color="blue-gray"className="w-full mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3 h-[60px] fixed z-50 bg-[#411c5e]">
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        <Typography as="a"href="/user/home"variant="h6"className="mr-4 ml-2 cursor-pointer py-1.5">Paintcont</Typography>

        <div className="flex md:flex flex-wrap gap-4 sm:gap-14 md:mr-4 sm:mr-4">
          {/* Convert text into links */}
          <a href="/painter/home" className="text-white">
            Home
          </a>
          <a href="/painter/home" className="text-white">
            Painter
          </a>
          <a href="#" className="text-white">
            Chat
          </a>
          <a href="#" className="text-white">
            Designs
          </a>
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
            <a href={profileLink} className="text-white">
              <RiUserLine className="text-lg" />
            </a>
            <button onClick={handleLogout} className="text-white">
              <RiLogoutCircleLine className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainterNavbar

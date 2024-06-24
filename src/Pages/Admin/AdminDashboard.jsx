import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { Card, Typography } from "@material-tailwind/react";
import axios from "../../Services/axiosService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminEndpoints } from "../../Services/endpoints/admin";
import AdminGraph1 from "../../Components/Admin/AdminGraph1";
import AdminGraph2 from "../../Components/Admin/AdminGraph2";

function AdminPainter() {

  const [user,setUser] = useState([])
  const [blockedUser,setBlockeduser] = useState([])
  const [blockedPainter,setBlockedPainter] = useState([])
  const [painter,setPainter] = useState([])

  useEffect(()=>{
    fetchUser()
  },[])

  const fetchUser = async () => {
    try {
      const response = await axios.post('/admin/dashboard')
      setUser(response.data.user)
      setPainter(response.data.painter)
      setBlockeduser(response.data.blockedUser)
      setBlockedPainter(response.data.blockedPainter)
    } catch (error) {
      console.log(error);
    }
  }

    return(        
      <div className="flex">
        <div className="border">
          <AdminNav />
        </div>

        <div>

          <div className="flex justify-evenly mt-20">

            <div className="rounded-[20px] font-bold flex justify-center items-center border w-[200px] h-[100px]">
              <p className="text-white">Users : {user.length}</p>
            </div>
            <div className="rounded-[20px] font-bold flex justify-center items-center border w-[200px] h-[100px]">
              <p className="text-white">Painters : {painter.length}</p>
            </div>
            <div className="rounded-[20px] flex font-bold justify-center items-center border w-[200px] h-[100px]">
              <p className="text-white">Blocked Users : {blockedUser.length}</p>
            </div>
            <div className="rounded-[20px] flex font-bold justify-center items-center border w-[200px] h-[100px]">
              <p className="text-white">Blocked Painters : {blockedPainter.length}</p>
            </div>

          </div>


        <div className="flex justify-evenly w-full h-screen p-4 mt-14">   

          <div className="w-[600px]">
            <AdminGraph1 />
          </div>
          <div className="ml-10 w-[600px]">
            <AdminGraph2 />
          </div>
          
        </div>

        </div>
      </div>
    )
}

export default AdminPainter;

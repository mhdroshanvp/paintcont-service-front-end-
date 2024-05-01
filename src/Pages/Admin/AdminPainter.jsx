import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { Card, Typography } from "@material-tailwind/react";
import axios from "../../Services/axiosService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminEndpoints } from "../../Services/endpoints/admin";

function AdminPainter() {
    const [painter, setpainter] = useState([]);

   
    const fetchUser = async () => {
      try {
        const response = await axios.get('/admin/painter');
        console.log(response,";;;;;;;;;;;");
        setpainter(response.data.painter);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        fetchUser();
      }, []);
  

      const blockUser = async (painterId) => {
        try {
          console.log(painterId,"]]]]]]]]]]]]]]]]]]]]]]]]]");
          const response = await axios.patch(AdminEndpoints.blockpainter(painterId));
          if (response.data.success) {
            const updatedPainter = painter?.map(user => {
              if (user._id === painterId) {
                return { ...user, isBlocked: !user.isBlocked };
              }
              return user;
            });
            setpainter(updatedPainter);
            
            if (updatedPainter.some(user => user._id === painterId && user.isBlocked)) {
              toast.success('User blocked successfully');
            } else {
              toast.success('User unblocked successfully');
            }
          } else {
            toast.error('Failed to update user status');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to update user status');
        }
      };
      
    
  
    const TABLE_HEAD = ["Name", "Email", "isBlocked", ""];

    return (
      <div className="flex">
        <div className="border">
          <AdminNav />
        </div>
        <div className="w-screen h-screen m-1 border">
          <Card className="h-full w-full overflow-scroll ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD?.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {painter?.map((user) => (
                  <tr key={user._id} className="p-4 border-b border-blue-gray-50">
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.username}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.email}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.isBlocked ? 'Blocked' : 'Unblocked'}
                      </Typography>
                    </td>
                    <td>
                      <button
                        as="a"
                        onClick={() => blockUser(user._id)}
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        O
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    );
}

export default AdminPainter;

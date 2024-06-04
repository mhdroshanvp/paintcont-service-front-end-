import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { Card, Typography } from "@material-tailwind/react";
import axios from "../../Services/axiosService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminEndpoints } from "../../Services/endpoints/admin";

function AdminPainter() {
    const [painter, setPainter] = useState([]);
   
    const fetchUser = async () => {
      try {
        const response = await axios.get('/admin/painter');
        setPainter(response.data.painter);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
        fetchUser();
      }, []);

    const blockUser = async (painterId) => {
      try {
        const response = await axios.patch(AdminEndpoints.blockpainter(painterId));
        if (response.data.success) {
          const updatedPainter = painter.map(user => {
            if (user._id === painterId) {
              return {...user, isBlocked: !user.isBlocked};
            }
            return user;
          });
          setPainter(updatedPainter);
          
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

    const TABLE_HEAD = ["Name", "Email", "isBlocked", "Actions"];

    return (
      <div className="flex">
        <div className="border">
          <AdminNav />
        </div>
        <div className="w-full h-screen p-4 ">
          <Card className="h-full w-full overflow-scroll bg-[#200a31]">
            {/* Center the table */}
            <div className="flex justify-center">
              <table className="w-3/4 mx-auto table-auto text-left border-collapse">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border border-blue-gray-100 bg-blue-gray-50 p-4 text-blue-gray-700"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {painter.map((user) => (
                    <tr key={user._id} className={`p-4 ${user.isBlocked ? "" : "border-b border-blue-gray-50"}`}>
                      <td className="border p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.username}
                        </Typography>
                      </td>
                      <td className="border p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.email}
                        </Typography>
                      </td>
                      <td className="border p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.isBlocked ? 'Blocked' : 'Unblocked'}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => blockUser(user._id)}
                          className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                          CLICK
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    );
}

export default AdminPainter;

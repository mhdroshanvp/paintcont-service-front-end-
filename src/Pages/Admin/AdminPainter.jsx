import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { Card, Typography } from "@material-tailwind/react";
import ReactPaginate from "react-paginate";
import axios from "../../Services/axiosService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminEndpoints } from "../../Services/endpoints/admin";

function AdminPainter() {
    const [currentPage, setCurrentPage] = useState(0);
    const [painter, setPainter] = useState([]);
    const pageSize = 20;

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
      try {
        const response = await axios.get('/admin/painter');
        setPainter(response.data.painter);
      } catch (error) {
        console.log(error);
      }
    }

    const blockUser = async (painterId) => {
      try {
        const response = await axios.patch(AdminEndpoints.blockpainter(painterId));
        if (response.data.success) {
          const updatedPainter = painter.map(user => {
            if (user._id === painterId) {
              return { ...user, isBlocked: !user.isBlocked };
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
    const offset = currentPage * pageSize;
    const pageCount = Math.ceil(painter.length / pageSize);
    const currentUsers = painter.slice(offset, offset + pageSize);

    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };

    return (
      <div className="flex">
        <div className="border">
          <AdminNav />
        </div>
        <div className="w-full h-screen p-4 mt-28">
          {/* <Card className="h-full w-full overflow-scroll"> */}
            <div className="flex justify-center">
              <table className="w-3/4 mx-auto table-auto text-left border-collapse shadow-lg bg-white">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border border-blue-gray-100 bg-custom-color p-4 text-blue-gray-700"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold leading-none"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id} className="p-4 hover:bg-gray-200">
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
                          className={`text-white font-medium py-1 px-4 rounded ${user.isBlocked ? "bg-red-500 hover:bg-red-700" : "bg-green-500 hover:bg-green-700"}`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          {/* </Card> */}
          <br />
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex justify-center mt-4"}
            previousLinkClassName={"pagination__link border text-white p-2 mr-2"}
            nextLinkClassName={"pagination__link border text-white p-2 ml-2"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active bg-blue-gray-200 text-blue-600"}
          />
        </div>
      </div>
    );
}

export default AdminPainter;

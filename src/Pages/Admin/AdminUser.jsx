import React, { useEffect, useState } from "react";
import AdminNav from "../../Components/Admin/AdminNav";
import { Card, Typography } from "@material-tailwind/react";
import ReactPaginate from "react-paginate";
import axios from "../../Services/axiosService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminEndpoints } from "../../Services/endpoints/admin";

function AdminUser() {
    const [currentPage, setCurrentPage] = useState(0);
    const [users, setUsers] = useState([]);
    const pageSize = 20;

    useEffect(() => {
      fetchUser();
    }, []);

    const fetchUser = async () => {
      try {
        const response = await axios.get('/admin/user');
        setUsers(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    const blockUser = async (userId) => {
      try {
        const response = await axios.patch(AdminEndpoints.blockuser(userId));
        if (response.data.success) {
          const updatedUsers = users.map(user => {
            if (user._id === userId) {
              return {...user, isBlocked:!user.isBlocked};
            }
            return user;
          });
          setUsers(updatedUsers);
          
          if (updatedUsers.some(user => user._id === userId && user.isBlocked)) {
            toast.success('User blocked successfully');
          } else if (updatedUsers.some(user => user._id === userId &&!user.isBlocked)) {
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
    const pageCount = Math.ceil(users.length / pageSize);
    const currentUsers = users.slice(offset, offset + pageSize);

    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };

    return (
      <div className="flex">
        <div className="border">
          <AdminNav />
        </div>
        <div className="w-screen h-screen">
            <table className="w-full min-w-max table-auto text-left m-8 ml-7">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border border-blue-gray-100 bg-blue-gray-50 p-4 text-white"
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
                {currentUsers.map((user) => (
                  <tr key={user._id} className={`p-4 ${user.isBlocked? "" : "border-b border-blue-gray-50"}`}>
                    <td className="border">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-white"
                      >
                        {user.username}
                      </Typography>
                    </td>
                    <td className="border">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-white"
                      >
                        {user.email}
                      </Typography>
                    </td>
                    <td className="border">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-white"
                      >
                        {user.isBlocked? 'Blocked'  : 'Unblocked'}
                      </Typography>
                    </td>
                    <td>
                      <button
                        as="a"
                        onClick={() => blockUser(user._id)}
                        variant="small"
                        color="blue-gray"
                        className="font-medium text-white"  
                      >
                        CLICK
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex justify-center"}
              previousLinkClassName={"pagination__link border border-blue-gray-200 rounded-full p-2 mr-2"}
              nextLinkClassName={"pagination__link border border-blue-gray-200 rounded-full p-2 ml-2"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active bg-blue-gray-200 text-blue-600"}
            />
        </div>
      </div>
    );
}

export default AdminUser;
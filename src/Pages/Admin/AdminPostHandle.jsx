import React from 'react'
import AdminNav from '../../Components/Admin/AdminNav';

function AdminPostHandle() {
    return (
        <div className="flex">
          <div className="border">
            <AdminNav />
          </div>
          <div className="w-screen h-screen">
            <p>POST</p>
          </div>
        </div>
      );
}

export default AdminPostHandle
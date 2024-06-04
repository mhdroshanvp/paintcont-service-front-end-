import React, { useState, useEffect } from 'react';
import AdminNav from '../../Components/Admin/AdminNav';
import axios from '../../Services/axiosService';
import { AdminEndpoints } from '../../Services/endpoints/admin';
import ClientPosts from '../../Components/Clients/ClientPosts';
import toast from "react-hot-toast";

function AdminPostHandle() {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(AdminEndpoints.fetchpost);
      if (response.data) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${AdminEndpoints.deletePost}/${postId}`);
      if(response.status === 200){
        toast.success("Post deleted successfully");
      }else{
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Error deleting post");
    }
  };
  

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
    }
  };
    
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="flex">
      <div className="border">
        <AdminNav />
      </div>

      <div className="flex flex-col items-center w-full">
        <div>
          <p className="text-white text-center text-4xl mt-4">Reported Post's</p>
        </div>

        <div className="flex flex-col w-full md:w-[70%] h-[100%] rounded-xl mt-4">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post, index) => {
              if (posts.length === index + 1) {
                return (
                  <div className="block rounded-xl bg-[#50187b67] m-1 md:m-5 h-100 md:h-[470px]" key={post._id}>
                    <p onClick={handleDeletePost} className='text-white text-center border border-white-500 bg-red-700 rounded-md px-4 py-2 cursor-pointer hover:bg-red-900 transition duration-300 ease-in-out'>
                      Delete
                    </p>
                    <div className='flex justify-center mr-5 mt-3'>
                    </div>
                    <ClientPosts showcase={true} post={post} />
                  </div>
                );
              } else {
                return (
                  <div className="block rounded-xl bg-[#50187b67] m-2 md:m-5 h-100" key={post._id}>
                    <ClientPosts post={post} postFetching={fetchPost} />
                  </div>
                );
              }
            })
          ) : (
            <p>No reported posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPostHandle;

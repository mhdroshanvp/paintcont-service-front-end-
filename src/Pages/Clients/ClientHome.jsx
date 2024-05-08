import React, { useEffect, useState } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import ClientCard from "../../Components/Clients/ClientCard";
import ClientHash from "../../Components/Clients/ClientHash";
import ClientPosts from "../../Components/Clients/ClientPosts";
import axios from "../../Services/axiosService";
import ClientSubscription from "../../Components/Clients/ClientSubscription";
import { UserEndpoints } from "../../Services/endpoints/user";
import { UserCircleIcon } from "@heroicons/react/24/solid";


function ClientHome() {

  const [posts, setPosts] = useState([]);
  const [searchQuery,setSearchQuery] = useState('') 

  console.log(searchQuery);

  const fetchPost = async () => {
    try {
      const response = await axios.get(UserEndpoints.homePage);
      console.log(response.data.post);
      setPosts(response.data.post);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch =  async () => {
    try {
      const response = await axios.post(UserEndpoints.search,{name:searchQuery})
      setPosts(response.data.filteredPosts )
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div className="w-full h-screen block">
        <div className="w-full h-[60px]">
          <ClientNavbar />
        </div>
        <div className="flex mt-2 h-[90%] w-full ">
          <div className="w-[30%] block ">
            <div className="w-full  md:block ">
              <ClientCard />
            </div>
            <ClientHash />
            <ClientSubscription />
          </div>
          <div style={{ msOverflowStyle: "none ", scrollbarWidth: "none" }} className="overflow-y-scroll  w-[70%] flex flex-col justify-center items-center">

            {/* Search bar */}
            <div className=" w-[75%] mt-16 flex items-center">
               <input
                 type="text"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search by painter name"
                className="w-full border h-10 px-4 py-2  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-800 bg-[#350e5267] text-white"
               />
             <button onClick={handleSearch} className="border ml-4 px-4 py-2 bg-[#4b216b]  text-white rounded-lg hover:bg-[#7a45a3]  focus:outline-none"><UserCircleIcon className="h-4 w-3"/></button>
            </div>

            <div className="flex flex-col w-[80%] h-[100%] rounded-xl ">
              {Array.isArray(posts.reverse()) && posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <div className="block rounded-xl bg-[#350e5267]  m-5 h-100 ">
                      <ClientPosts key={post._id} post={post} />
                    </div>
                  );
                })
              ) : (
                <p>No posts available</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ClientHome;

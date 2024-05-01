import React, { useEffect, useState } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import ClientCard from "../../Components/Clients/ClientCard";
import ClientHash from "../../Components/Clients/ClientHash";
import ClientPosts from "../../Components/Clients/ClientPosts";
import axios from "../../Services/axiosService";
import ClientSubscription from "../../Components/Clients/ClientSubscription";
import { UserEndpoints } from "../../Services/endpoints/user";

function ClientHome() {
  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(UserEndpoints.homePage);
      console.log(response.data.post);
      setPosts(response.data.post);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          <div
            style={{ msOverflowStyle: "none ", scrollbarWidth: "none" }}
            className="overflow-y-scroll  w-[70%] flex flex-col justify-center items-center   "
          >
            <div className="flex flex-col w-[95%] h-[100%] rounded-xl ">
              {Array.isArray(posts.reverse()) && posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <div className="block rounded-xl bg-[#411c5e]  m-5 h-[450px] ">
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

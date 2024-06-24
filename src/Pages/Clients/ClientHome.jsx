import React, { useEffect, useState, useRef } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import ClientCard from "../../Components/Clients/ClientCard";
import ClientHash from "../../Components/Clients/ClientHash";
import ClientPosts from "../../Components/Clients/ClientPosts";
import axios from "../../Services/axiosService";
import ClientSubscription from "../../Components/Clients/ClientSubscription";
import { UserEndpoints } from "../../Services/endpoints/user";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Spinner from "../../Components/Extra-designs/spinner"
import StickyHome from "../../Components/Common/StickyHome";

function ClientHome() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
 const [smState,setSmState] = useState(true)
  const observer = useRef();
  const devRef = useRef()

  const lastPostElementRef = useRef(null);

  const fetchPost = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${UserEndpoints.homePage}?page=${page}&limit=2`);
      setPosts(prevPosts => [...prevPosts, ...response.data.posts]);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(UserEndpoints.search, { name: searchQuery });
      setPosts(response.data.filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost(page);
  }, [page]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (lastPostElementRef.current) observer.current.observe(lastPostElementRef.current);
  }, [loading, page, totalPages]);

  return (
    <>
      <div className="w-full h-screen block">
        <div className="w-full h-[60px]">
          <ClientNavbar setSmState={setSmState} smState={smState} />
        </div>
        <div className="block md:flex mt-2 sm:h-[90%] w-full ">
          <div className="w-full sm:h-[130px]    md:w-[30%]">
             <div className="hidden sm:block ">
              <ClientCard />
            </div>
            <div className="hidden xl:block md:block lg:block">
              <ClientHash />
            </div>
          </div>
          <div style={{ msOverflowStyle: "none ", scrollbarWidth: "none" }} ref={devRef} className="overflow-y-scroll w-full md:w-[70%] flex flex-col justify-center items-center">
            
            {/* searchBar */}
            <div className=" w-full m-1 md:w-[75%] md:mt-28 sm:mt-16 flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by painter name"
                className="w-full h-10 px-4 py-2  border-gray-300 rounded-lg focus:outline-none focus:border-indigo-800 bg-[#50187b67] text-white"
              />
              <button onClick={handleSearch} className="ml-4 px-4 py-2 bg-[#50187b67] text-white rounded-lg hover:bg-[#7a45a3]  focus:outline-none">
                <UserCircleIcon className="h-6 w-3" />
              </button>
            </div>



            {loading && <Spinner />}
            
                <div className="flex flex-col w-full md:w-[80%] h-[100%] rounded-xl ">
                    {Array.isArray(posts) && posts.length > 0 ? (
                      posts.map((post, index) => {
                        if (posts.length === index + 1) {
                          return (
                            <div ref={lastPostElementRef} className="block rounded-xl bg-[#50187b67] m-1 md:m-5 h-100" key={post._id}>
                              <ClientPosts post={post} />
                            </div>
                          );
                        } else {
                          return (
                            <div className="hover:bg-[#50187b46] block rounded-xl bg-[#50187b67] m-2 md:m-5 h-100" key={post._id}>
                              <ClientPosts post={post} postFetching={fetchPost} />
                            </div>
                          );
                        }
                      })
                    ) : (
                      <p> </p>
                    )}
                </div>

            
            <div className="w-full flex justify-end pe-11 sticky top-[600px]">
              <StickyHome scrollToTop={()=>{
                devRef.current.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });

              }}/>
            </div>

            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientHome;

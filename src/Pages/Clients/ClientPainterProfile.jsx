import React, { useState, useEffect } from "react";
import axios from "../../Services/axiosService";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import ClientPost from "../../Components/Clients/ClientPosts";
import img from "../../assets/user-removebg.png";
import { UserEndpoints } from "../../Services/endpoints/user";
import { socket } from "../../socket/socket";
import { io } from "socket.io-client";
import { loadStripe } from "@stripe/stripe-js";
import { FaLock } from "react-icons/fa";

function ClientPainterProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const userId = decode.username;

    const [painter, setPainter] = useState(null);
    const [follow, setFollow] = useState(false);
    const [countFollow, setCountFollow] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [showChatModal, setShowChatModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [outline,setOutline] = useState(false)
    const [editData, setEditData] = useState({
        username: '',
        email: '',
        description: '',
        specialised: [],
        aboutMe: '',
        experience: ''
    });
    const [posts, setPosts] = useState([]);
    const [slot, setSlot] = useState([]);
    const [bookSlot, setBookSlot] = useState({});
    const [booked,setBooked] = useState(false)



    // console.log(slot,"-----------000000000000"); 




  const followPainter = async () => {
    try {
      const data = { painterId: id, userId };
      console.log('click received',data)
      const response = await axios.post("/user/followPainter", data);
      console.log(response,'responce')
      if (response.data.success) {
        const response2 = await axios.get(`/user/painter/profile/${id}`);
        console.log(response2.data)
        const resultFollow=await response2?.data.painter.followers.includes(userId)
        const tempLength = response2?.data.painter.followers.length
        const tempPost = await response?.data?.posts
        console.log(resultFollow)
        setFollow(resultFollow);
        setCountFollow(tempLength);
        // setPosts(tempPost);
        
      }
      else{

      }
    } catch (error) {
       
    }
  };




  const fetchPainter = async () => {
    try {
      console.log('clicked follow')
      const response = await axios.get(`/user/painter/profile/${id}`);
      console.log(response,'responseresponse')
      setSlot(response.data.slot);
      setPainter(response.data.painter);
      setFollow(response.data.painter.followers.includes(userId));
      setCountFollow(response.data.painter.followers.length);
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    socket.emit("slotBooked", { ...bookSlot, painterId: id });
    // fetchPainter()
  },[])

  const checkBooking = async () => {
    try {
      const response = await axios
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    
  },[slot])


  useEffect(() => {
    fetchPainter();

    socket.on("slotBooked", (data) => {
        if (data.painterId === id) {
            setSlot((prevSlots) =>
                prevSlots.map((s) =>
                    s._id === data.slotId ? { ...s, status: "booked" } : s
                )
            );
            fetchPainter()
        }
    });

    return () => {
        socket.off("slotBooked");
    };
  }, [id, userId]);




  const openModal = async () => {
    setShowChatModal(true);
    try {
      const response = await axios.get(`/user/painter/profile/followerList/${id}`);
      if (response.data) {
        setFollowers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = () => {
    setEditData({
      username: painter.username,
      email: painter.email,
      description: painter.description,
      specialised: painter.specialised,
      aboutMe: painter.aboutMe,
      experience: painter.experience,
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: name === 'specialised' ? value.split(',').map(item => item.trim()) : value,
    }));
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put(`/user/painter/profile/${id}`, editData);
      if (response.data.success) {
        setPainter(response.data.painter);
        closeEditModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowChatModal(false);
  };

  const handleSlot = (start, end, date,id) => {
    const data = { start, end, date,slotId:id };
    setBookSlot(data);
    setOutline(id)
    // console.log(data, "-------------------------");
  };

  
const handleSlotBooking = async () => {
    try {
      // console.log("gds")
        if (Object.keys(bookSlot).length > 0) {
            const data = { userId, bookSlot, painterId: id };
            const response = await axios.post(UserEndpoints.booked, data);
            if (response.data) {
                setBooked(true)
                toast.success("Slot Booked");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

//////////////////////////////////////////////////////////////////////////////////////////

const makePayment = async () => {
  try {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_KEY);

    const data = {slot,userId}

    console.log(data,"-------------------------------");

    const response = await axios.post('/stripe/create-checkout-session', data);

    const session = response.data;

    console.log(session);

    if(session.save == true){
      handleSlotBooking()
    }
    

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if(result){
      const response = await axios.post('/stripe/create-checkout-session', data);

      console.log(response)
    }

    if (result.error) {
      console.log(result.error);
    }

  } catch (error) {
    console.log(error);
  }
};


const handleLockedMessage = () => {
  if (!booked) {
    toast.error("Book the slot for unlocking the message");
  }
};


//////////////////////////////////////////////////////////////////////////////////////////


  return (
    <div>
    <Toaster />
      <div className="  w-full fixed z-20">
        <ClientNavbar />
      </div>
      <div className="  linear-gradient(to right, #200a31, #1f3752)">
        <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div className="flex border-red-500 m-1 p-1 col-span-4 sm:col-span-3">
              <div className="bg-white   border-red-500 w-full shadow rounded-lg p-6  mt-5 md:h-[600px]">
                <div className="flex flex-col items-center">
                  {painter ? (
                    <>
                      <img
                        src="/profileIcon.png"
                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                        alt="Profile"
                      />
                      <h1 className="text-xl font-bold">{painter.username}</h1>
                      <p className="text-gray-700">{painter.email}</p>

                      <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <button onClick={()=>{followPainter()}} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                          {follow ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                      
                      <p onClick={openModal} className="mt-4 text-gray-700 cursor-pointer">Followers: {countFollow}</p>
                    </>
                  ) : (
                    <p>Painter data not found</p>
                  )}
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    Specialised:
                  </span>
                  <ul>
                    {painter?.specialised.map((specialty, index) => (
                      <li key={index} className="mb-2">{specialty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow h-[6000px] rounded-lg p-6 mt-7">
                <h2 className="text-xl font-bold mt-6 mb-4">About Me</h2>
                <p className="text-gray-700">
                  {painter?.description}
                </p>
                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                {painter?.experience && (
                  <div className="mb-6">
                    <div className="flex justify-between flex-wrap gap-2 w-full">
                      <span className="text-gray-700 font-bold">{painter.experience}</span>
                    </div>
                  </div>
                )}



                <div className="flex flex-col bg-white  border rounded-2xl mb-6">
                  <p className="m-3 uppercase font-semibold">Available slots:</p>



                  <div className="flex flex-col sm:flex-row items-center justify-center m-5">
                        
                        {slot.map((slt, index) => {
                          const date = slt?.date ? slt.date.toString().split("T")[0] : "No date available";

                          // if(slt.status === "booked"){

                          //   setBooked(true)
                          // }
                          
                          return (
                            <div key={index} className="flex flex-col items-center justify-center">
                              <p>{date}</p>
                              {slt.status === "booked" ? (
                                <div className="border bg-red-500  text-center p-3 px-6 m-2 max-w-52 min-w-52">
                                  <p>Booked</p>
                                </div>
                              ) : (
                                <div 
                                  className={`${outline=== slt._id ? 'border-red-500' : ''} bg-gray-400  focus:outline-none  border-4 focus:outline-green-600  text-center p-3 px-6 m-2 max-w-52 min-w-52   hover:cursor-pointer`}
                                  onClick={() => handleSlot(slt.start, slt.end, date, slt._id)}
                                >
                                  <p>{slt.start} to {slt.end}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}

                  </div>              
                  
                  {
                    slot.length ?<div className="flex   flex-row items-center justify-center m-5">
                    <div className="bg-amber-500 hover:bg-amber-600 rounded-lg p-3 m-2">
                      <p onClick={makePayment}>Book The Slot</p>
                    </div>

                      {!slot.filter((i)=>i.status === "booked").length ? (
                              <div
                              onClick={handleLockedMessage} 
                               className="bg-slate-500 hover:bg-slate-600 rounded-lg p-3 m-2 flex items-center">
                                <p>Message Painter</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </div>
                      ) : (
                              <div onClick={() => navigate(`/user/chat/${id}`)} className="bg-blue-500 hover:bg-blue-600 rounded-lg p-3 m-2">
                                <p>Message Painter</p>
                              </div>
                      )}

                  </div>:(
                    <div className="flex justify-center items-center h-full">
                      <p>There is no slots available</p>
                    </div>
                  )
                  }
                </div>

                

                <div className="flex flex-col bg-purple-950  border rounded-2xl mb-6">
                  <p className="text-white  font-bold mt-3 ml-3">Painter posts:</p>
                   <div className="max-auto rounded-2xl min-h-[30rem]">
                      {posts.map((post) => (
                         <div className="block rounded-xl bg-[#50187b67] m-5 h-100" key={post._id}>
                            <ClientPost post={post} />
                          </div>
                      ))}
                  </div>
                </div>  
                
              </div>

            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={showChatModal} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center bg-gray-800 mt-8 bg-opacity-75">
        <div className="bg-white rounded-lg w-[350px] p-3 h-[500px]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Followers List</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>
          <div className="h-[420px] border rounded-[20px]">
            <div className="overflow-auto h-full">
              {followers?.length > 0 ? (
                followers?.map((follower, index) => (
                  <div key={index} className="flex items-start mb-4 p-2 ml-8">
                    <img src={img} alt="Avatar" className="w-8 h-8 rounded-full mr-3" />
                    <div className="bg-gray-100 rounded-lg p-1">
                      <p className="text-sm text-gray-700">{follower.username}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">0 followers</p>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ClientPainterProfile;

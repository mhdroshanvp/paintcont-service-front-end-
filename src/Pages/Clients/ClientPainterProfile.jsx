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





  const followPainter = async () => {
    try {
      const data = { painterId: id, userId };
      const response = await axios.post("/user/followPainter", data);

      if (response.data.success) {
        setFollow(response.data.follow);
        setCountFollow(response.data.followerCount);
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };




  const fetchPainter = async () => {
    try {
      const response = await axios.get(`/user/painter/profile/${id}`);
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
            toast.success("A slot has been booked!");
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
    // console.log(data, "-------------------------");
  };

  const handleSlotBooking = async () => {
    try {
        if (Object.keys(bookSlot).length > 0) {
            const data = { userId, bookSlot, painterId: id };
            const response = await axios.post(UserEndpoints.booked, data);
            if (response.data) {
                
                toast.success("Slot Booked");
            }
        }
    } catch (error) {
        console.log(error);
    }
};


  return (
    <>
    <Toaster />
      <div className="w-full fixed z-20">
        <ClientNavbar />
      </div>
      <div className="linear-gradient(to right, #200a31, #1f3752)">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6  mt-6">
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
                        <button onClick={followPainter} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
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
                <div className="flex flex-col bg-white h-[400px] border rounded-2xl mb-6">
                  <p className="m-3 uppercase font-semibold">Available slots:</p>



                  <div className="flex flex-col sm:flex-row items-center justify-center m-5">
                        
                        {slot.map((slt, index) => {
                          const date = slt?.date ? slt.date.toString().split("T")[0] : "No date available";
                          return (
                            <div key={index} className="flex flex-col items-center justify-center">
                              <p>{date}</p>
                              {slt.status === "booked" ? (
                                <div className="bg-red-500 text-center p-3 px-6 m-2 max-w-52 min-w-52">
                                  <p>Booked</p>
                                </div>
                              ) : (
                                <div 
                                  className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 hover:bg-gray-500 hover:cursor-pointer"
                                  onClick={() => handleSlot(slt.start, slt.end, date, slt._id)}
                                >
                                  <p>{slt.start} to {slt.end}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}

                  </div>
              
                  
                  <div className="flex flex-row items-center justify-center m-5">
                    <div className="bg-amber-500 hover:bg-amber-600 rounded-lg p-3 m-2">
                      <p onClick={handleSlotBooking}>Book The Slot</p>
                    </div>
                    <div onClick={() => navigate(`/user/chat/${id}`)} className="bg-blue-500 hover:bg-blue-600 rounded-lg p-3 m-2">
                      <p>Message Painter</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col bg-purple-950  h-[5000px] border rounded-2xl mb-6">
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
    </>
  );
}

export default ClientPainterProfile;

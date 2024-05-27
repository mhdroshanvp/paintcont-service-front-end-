import React, { useState, useEffect } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import axios from "../../Services/axiosService";
import {jwtDecode} from "jwt-decode";  // Ensure correct import
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import img from "../../assets/user-removebg.png";

function ClientPainterProfile() {
  const navigate = useNavigate()
  const [painter, setPainter] = useState(null);
  const [follow, setFollow] = useState(false);
  const [countFollow, setCountFollow] = useState(0); // Initialize follower count to 0
  const [followers, setFollowers] = useState([]); // Initialize followers to an empty array
  const [showChatModal, setShowChatModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ 
    username: '', 
    email: '', 
    description: '', 
    specialised: [], // Changed to array
    aboutMe: '', 
    experience: '' 
  });
  


  const { id } = useParams(); 
  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userId = decode.username;

  const followPainter = async () => {
    try {
      const data = { painterId: id, userId };
      const response = await axios.post("/user/followPainter", data);

      if (response.data.success) {
        setFollow(response.data.follow);
        setCountFollow(response.data.followerCount);  // Update follower count from response
      }
    } catch (error) {
      console.log(error);
    }
  };


  const indMsg = async () => {
    try {
      const data = {painterId: id}
      const response = await axios.get(`/user/painter/profile/indMsg/${id}`)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchPainter = async () => {
      try {
        const response = await axios.get(`/user/painter/profile/${id}`);
        setPainter(response.data.painter);
        setFollow(response.data.painter.followers.includes(userId));
        setCountFollow(response.data.painter.followers.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPainter();
  }, [id, userId, countFollow]);



  const openModal = async () => {
    setShowChatModal(true);
    try {
      const response = await axios.get(`/user/painter/profile/followerList/${id}`);

      console.log(response.data,"response");

      if (response.data) {
        console.log("hhhhhhhhhhhhhhhhhhhh");
        setFollowers(response.data); // Set the followers list from the response
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



  return (
    <>
      <div className="w-full fixed z-20">
        <ClientNavbar />
      </div>
      

      <div className="linear-gradient(to right, #200a31, #1f3752)">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6 fixed mt-6">
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
              <div className="bg-white shadow rounded-lg p-6 mt-7 h-full">


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
                <div className="flex flex-col bg-white h-[35rem] border rounded-2xl mb-6">
                  <p className="m-3 uppercase font-semibold">Available slots:</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center m-5">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        12:00 am
                      </div>
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        12:00 am
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-5 sm:mt-0">
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        no slot Available
                      </div>
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        no slot Available
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-5 mb-2 uppercase font-semibold">Afternoon:</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center m-5">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        12:00 am
                      </div>
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        12:00 am
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-5 sm:mt-0">
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        no slot Available
                      </div>
                      <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase">
                        no slot Available
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center m-5">
{/* /////////////////////////////////////////// */}

                    <div onClick={()=>navigate(`/user/chat/${id}`)}  className="bg-amber-500 rounded-lg p-3 m-2">
                      <p>Book The Slot</p>
                    </div>
{/* /////////////////////////////////////////// */}
                  </div>
                </div>
                <div className="max-auto rounded-2xl bg-[#0D0E26] min-h-[30rem]">
                  <p className="text-white">Painter posts</p>
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
              {followers.length > 0 ? (
                followers.map((follower, index) => (
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

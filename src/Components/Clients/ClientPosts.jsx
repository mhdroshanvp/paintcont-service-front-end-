import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Services/axiosService";
import { jwtDecode } from 'jwt-decode';
import { UserEndpoints } from "../../Services/endpoints/user";
import toast from "react-hot-toast";
import Modal from "react-modal";

function ClientPosts({ post }) {
  const [liked, setLiked] = useState(post );
  const [countLike, setCountLike] = useState(post.likes);
  const [showReportButton, setShowReportButton] = useState(false);
  const [reported, setReported] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const token = localStorage.getItem('token');
  const postId = post._id;

  

//   useEffect(() => {
// console.log('hello')
//   }, []);

  const openModal = () => {
    setShowChatModal(true);
  };

  const closeModal = () => {
    setShowChatModal(false);
  };
  
  const toggleLike = async () => {
    try {
      console.log('coming here')
      const decode = jwtDecode(token);
      const userId = decode.username;
      const data = { postId: postId, userId: userId, liked: !liked };
      const response = await axios.post("/user/update-like", data);

if(liked){
  setLiked(false)
      setCountLike(countLike-1)

    }else if(!liked){
      setLiked(true)
      setCountLike(countLike+1)
    }
      // setLiked(!liked);


    } catch (error) {
      console.log(error);
    }
  };

  const toggleReportButton = () => {
    setShowReportButton(!showReportButton);
  };

  const handleReport = async () => {
    try {
      console.log(postId,"llllllllllllllllllllllll");
      const response = await axios.post(UserEndpoints.report, { postId });
      console.log('response -- ', response.data.reportLimitReached)
      if (response.data.success) {
        setReported(true);
      }
      if (response.data.reportLimitReached) toast.success('reported successfully')
    } catch (error) {
      console.log(postId)
      console.log('kkkkkkkk`',error.message);
    }
  };

  return (
    <>
      <div className="border rounded-[10px] block">
        <div className="flex border bg-[#ffffff2b] m-2 w-[620px] h-7 rounded-[10px] items-center">
          <Link to={`/user/painter/profile/${post.painterId._id}`} className="ml-4 flex items-center">
            <FaUser size={13} color="white " className='cursor-pointer' />
            <h1 className="ml-2 text-white">{post.painterId?.username}</h1>
          </Link>
          
          <div className="relative ml-auto mr-3">
            <BiDotsVerticalRounded color="white" onClick={toggleReportButton} className="cursor-pointer"/>
            {showReportButton && !reported && (
              <div className="absolute bg-gray-900 p-2 rounded-md bottom-7 right-0">
                <button className="text-white" onClick={handleReport}>Report</button>
              </div>
            )}
            {reported && (
              <div className="absolute bg-gray-900 p-2 rounded-md bottom-7 right-0">
                <p className="text-white">Reported</p>
              </div>
            )}
          </div>
        </div>

        <div className="block text-white m-2 ml-4">
          <h1>{post?.description}</h1>
        </div>

        <div className="flex justify-center items-center">
        <div className="h-300 border rounded-[20px] flex justify-center  w-[600px] ">
          <img className="size-52 bg-center w-[300px] h-[300px] rounded-[22px] " src={post?.media} alt="Placeholder"/>
        </div>
        </div>


        {/* <hr />  */}
        <div className="flex items-center justify-between p-2 rounded-[10px]">
          <div className="flex items-center space-x-5">
            <div className="cursor-pointer ml-3" onClick={toggleLike}>
              {liked ? (<AiFillHeart color="red" />) : (<AiOutlineHeart color="white" />)}</div>
              <div className="text-white text-">{countLike}</div>
            <div className="cursor-pointer">
              <BsChat color="white" onClick={openModal} />
            </div>
          </div>
        
        </div>
      </div>
      
      {/* Chat Modal */}
      <Modal isOpen={showChatModal} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center bg-gray-800 mt-8 bg-opacity-75">
        <div className="bg-white rounded-lg w-[500px] p-4 h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Comments</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>
          <div className="h-96 border">
          </div>
          <div>
            <input placeholder="  Add a comment" className="border rounded-lg w-full h-8 mt-3"  type="text" name="" id="" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ClientPosts;

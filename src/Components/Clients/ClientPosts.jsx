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
import userImg from "../../assets/user-removebg.png" 



function ClientPosts({post}) {

  const [liked, setLiked] = useState(post.liked);
  const [countLike, setCountLike] = useState(post.likes.length);
  const [showReportButton, setShowReportButton] = useState(false);
  const [reported, setReported] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  let token = localStorage.getItem('Painter_token');
  if(!token){
    token = localStorage.getItem('token');
  }
  const postId = post._id;
  const decode = jwtDecode(token);
  const userId = decode.username;

  

  useEffect(() => {
    if(post.likes.includes(userId)){
      setLiked(true)
    }else{
      setLiked(false)
    }
  }, []);


  const submitComment = async () => {
    try {

      const response = await axios.post("/user/post/comments", { postId: post._id, content: newComment,userId,painterId:post.painterId  });

      if (response.data.success) {

        setComments([...comments, response.data.comment]);
        setNewComment(response.data);
        console.log(newComment,"==================");

      }

    }catch (error) {
      console.error(error);
    }
  };


  const openModal = () => {
    setShowChatModal(true);
  };

  const closeModal = () => {
    setShowChatModal(false);
  };
  
const toggleLike = async () => {
    try {
      const data = { postId,userId};
      const response = await axios.post("/user/update-like", data);
  if(response.data.success){
    setLiked(response.data.liked)
    setCountLike(response.data.post.likes.length)
  }
    } catch (error) {
      console.log(error);
    }
  };

  

  const toggleReportButton = () => {
    setShowReportButton(!showReportButton);
  };

  const handleReport = async () => {
    try {
      const response = await axios.post(UserEndpoints.report, { postId });
      if (response.data.success) {
        setReported(true);
      }
      if (response.data.reportLimitReached) toast.success('reported successfully')
    } catch (error) { 
      console.log('kkkkkkkk`',error.message);
    }
  };

  return (
    <>
    
      <div div className=" rounded-[10px] block">
        <div className="flex bg-[#ffffff2b] m-2 w-[98%] h-7 rounded-[10px] items-center">
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
        <div className="h-300 rounded-[20px] flex justify-center  w-[600px] ">
          <img className="size-52 bg-center w-[600px] h-[300px] rounded-[20px] " src={post?.media} alt="Placeholder"/>
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
            <div className="overflow-auto h-full">
              {post.comments.map(comment => (
                <div key={comment._id} className="flex items-start mb-4">
                  <img src={userImg} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                  <div className="bg-gray-100 rounded-lg p-2">
                    <p className="text-sm text-gray-700">{comment.text}</p>
                    {/* <span className="text-xs text-gray-500">{ .fromNow()}</span> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment" className="border rounded-lg w-full h-8 mt-3" type="text" name="" id="" />
            <button onClick={submitComment} className="border bg-blue-600 w-12 h-8 mt-3">Send</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ClientPosts;
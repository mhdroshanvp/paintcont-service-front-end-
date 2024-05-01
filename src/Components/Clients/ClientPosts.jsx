import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "../../Services/axiosService";
import { jwtDecode } from 'jwt-decode';
import { UserEndpoints } from "../../Services/endpoints/user";
import toast from "react-hot-toast";

function ClientPosts({ post }) {
  const [liked, setLiked] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const [showReportButton, setShowReportButton] = useState(false);
  const [reported, setReported] = useState(false);
  const token = localStorage.getItem('token');
  const postId = post._id;

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${postId}`);
    if (likedStatus) {
      setLiked(JSON.parse(likedStatus));
    }
  }, []);

  const toggleLike = async () => {
    try {
      const decode = jwtDecode(token);
      const userId = decode.username;
      const newCount = liked ? countLike - 1 : countLike + 1;
      const data = { postId: postId, userId: userId, liked: !liked };

      //send API
      const response = await axios.post("/user/update-like", data);

      // Update component state
      setLiked(!liked);

      // Update localStorage
      localStorage.setItem(`liked_${postId}`, JSON.stringify(!liked));
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
      <div className="block">
        <div className="flex border bg-[#ffffff2b] m-2 w-[750px] h-7 rounded-[10px] items-center">
          <Link to={`/user/profile/${post.painterId._id}`} className="ml-4 flex items-center">
            <FaUser size={13} color="white" />
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
        <div className="h-300 rounded-[20px] flex justify-center w-[745px] ml-3  bg-[#ffffff2b]">
          <img className="size-52 bg-center w-[300px] h-[300px] rounded-[22px] " src={post?.media} alt="Placeholder"/>
        </div>
        <div className="flex items-center justify-between p-2 rounded-[10px]">
          <div className="flex items-center space-x-5">
            <div className="cursor-pointer ml-3" onClick={toggleLike}>
              {liked ? (<AiFillHeart color="red" />) : (<AiOutlineHeart color="white" />)}</div>
              <divdiv className="text-white text-">{post?.likes}</divdiv>
            <div className="cursor-pointer">
              <BsChat color="white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientPosts;

import React, { useState, useEffect,useRef } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "../../Services/axiosService";
import {jwtDecode} from 'jwt-decode';
import { UserEndpoints } from "../../Services/endpoints/user";
import toast from "react-hot-toast";
import Modal from "react-modal";
import userImg from "../../assets/user-removebg.png";
import uploadImageToFirebase from "../../Services/firebaseconfig/imageUploader";
import { PainterEndpoints } from "../../Services/endpoints/painter";

function ClientPosts({ post, postFetching ,edit,painterId,indPostId,id,onDelete,showcase}) {
  // console.log(post)
  const [liked, setLiked] = useState(post?.liked);
  const [countLike, setCountLike] = useState(post?.likes?.length);
  const [showReportButton, setShowReportButton] = useState(false);
  const [reported, setReported] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState("");
  const [description, setDescription] = useState(post?.description);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);  
  const [postImg,setPostImg] = useState()
  const [report,setReport] = useState(post?.reportCount)

  // console.log(post?.reportCount);


  let token = localStorage.getItem('token');
  if(token){
    const decode = jwtDecode(token);
   var userId = decode?.username;
  }
  const postId = post._id;

  const descriptionRef = useRef(null);

  useEffect(()=>{
    try {
      setPostImg(post?.media)
    } catch (error) {
      console.log(error);
    }
  },[post])

  useEffect(() => {
    if (post?.likes?.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [post?.likes, userId]);

  const submitComment = async () => {
    try {
      const response = await axios.post("/user/post/comments", { postId, content: newComment, userId, painterId: post?.painterId });
      if (response.data.success) {
        setComments([...comments, response?.data?.comment]);
        setNewComment("");
        postFetching(1); // Refresh the posts if needed
      }
    } catch (error) {
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
      const data = { postId, userId };
      const response = await axios.post(UserEndpoints.like, data);
      if (response.data.success) {
        setLiked(response?.data?.liked);
        setCountLike(response?.data?.post?.likes?.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleReportButton = () => {
    setShowReportButton(!showReportButton);
  };

  const handleReport = async () => {
    try {
      const data = {postId, userId}
      const response = await axios.post(UserEndpoints.report, data);
      if (response.data.success) {
        setReported(true);
        setReport(response.data.post.reportCount)
      }
      if (response.data.reportLimitReached) toast.success('Reported successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (selectedAvatar) {
      try {
        const fileUrl = await uploadImageToFirebase(selectedAvatar, "test/");
        if (!fileUrl) return toast.error("Error uploading files");

        const data = {
          imageUrl: fileUrl,
          description: descriptionRef?.current?.value,
          painterId: painterId,
        };

        await axios.post(PainterEndpoints.Profile, { data }); // Correct request format
        
        setDescription("");
        closeModal();
        toast.success("Post created successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }else if(!selectedAvatar && description !== post.description){
      
      const data = {
        imageUrl: postImg,
        description: descriptionRef?.current?.value,
        painterId: painterId,
      };

      await axios.post(PainterEndpoints.Profile, { data }); // Correct request format
      
      setDescription("");
      closeModal();
      toast.success("Post created successfully");

    }else  {
      toast.error("No image selected");
    }
  };

  const handleAvatarChange = (files) => {

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Invalid file format. Please select an image (JPEG, PNG, GIF).");
        setSelectedAvatar(null);
        setPreviewAvatar(null);
        return;
      }

      if (selectedFile.size > maxSizeInBytes) {
        toast.error("File size exceeds the maximum limit of 5MB.");
        setSelectedAvatar(null);
        setPreviewAvatar(null);
        return;
      }

      setSelectedAvatar(selectedFile);
      setPreviewAvatar(URL.createObjectURL(selectedFile));
      setPostImg(URL.createObjectURL(selectedFile))
    } else {
      setSelectedAvatar(null);
      setPreviewAvatar(null);
    }
  };

  const deletePost = async () => {
    try {
      const response = await axios.delete(`/painter/delete-post/${postId}`);
      if (response.status === 200) {
        onDelete(id)
        toast.success("Post deleted successfully");
        // Optionally refresh posts or update the state to remove the deleted post
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error("Error deleting post");
    }
  };
  

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost();
    }
  };
  
// console.log(report);
  return (
    <>
      <div className={`${edit ? 'py-3' : ''} rounded-[10px] block`}>

      {
        !edit && !showcase &&
        <div className="flex relative bg-[#ffffff2b] m-2 w-[98%] h-7 rounded-[10px] items-center">
            <FaUser size={13} color="white" className='cursor-pointer ml-6' />
          <Link to={`/user/painter/profile/${post?.painterId?._id}`} className=" flex items-center">
            <h1 className=" text-white">{post?.painterId?.username}</h1>
          </Link>
          { !report?.includes(userId) && (
          <div className="relative ml-auto mr-3">
            <BiDotsVerticalRounded color="white" onClick={toggleReportButton} className="cursor-pointer " />
            {showReportButton && (
              <div className="absolute bg-gray-900 p-2 rounded-md bottom-7 right-0">
                <button className="text-white hover:text-red-700" onClick={handleReport}>Report</button>
              </div>
            )}

          </div>
           )}
          {report?.includes(userId) && (
              <div className="absolute  p-2 rounded-md  right-2">
                <p className="text-red-600">Reported</p>
              </div>
            )}
        </div>
      }

        <div className="block text-white m-2 ml-4">
          {
            edit?
            <>
              <textarea  onChange={(e) => setDescription(e.target.value)} ref={descriptionRef}  className="w-full bg-transparent focus:outline-none focus:outline-gray-500" value={description} name="" id=""></textarea>
              <button onClick={handlePostSubmit} className="border p-1 rounded-[10px]">Save</button>
              <button onClick={handleDeletePost} className="border ms-1 p-1 rounded-[10px]">Delete Post</button>
            </>
            :
          <h1 >{description}</h1>
          }
        </div>

        <div className="flex justify-center items-center ">
          <div className=" h-300 rounded-[20px] flex flex-col items-center    justify-center w-[600px]">
          {/* md:hover:scale-125 hover:scale-110 */}
            {
              edit?
              <>
                    <input
                      type="file"
                      className="py-2 px-4 text-white rounded-full mb-4"
                      accept="image/*"
                      onChange={(e) => handleAvatarChange(e.target.files)}
                    />
                    {
                        previewAvatar?
                        <></>
                    :
                    <></>
          }
              </>
              :
              <></>
            }
            <img className="size-52 bg-center sm:w-full w-[90%] h-[300px] rounded-[20px]" src={postImg} alt="Placeholder" />
          </div>
        </div>
        

        {
        !edit && !showcase &&

        <div className="flex items-center justify-between p-2 rounded-[10px]">
          <div className="flex items-center space-x-5">
            <div className="cursor-pointer ml-3 hover:scale-125" onClick={toggleLike}>
              {liked ? (<AiFillHeart color="red" />) : (<AiOutlineHeart color="white" />)}
            </div>
            <div className="text-white">{countLike}</div>
            <div className="cursor-pointer hover:scale-125 text-md">
              <BsChat color="white" onClick={openModal} />
            </div>
          </div>
        </div>
      }
      </div>
      {
        !edit &&
      
      <Modal isOpen={showChatModal} onRequestClose={closeModal} className="fixed inset-0 flex items-center justify-center  bg-purple-950 bg-opacity-75 ">
         {/* from-purple-900 via-purple-900 to-indigo-800  */}
        <div className=" bg-[#50187bc4] rounded-lg w-[700px] p-5 h-[56 0px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Comments</h2>
            <button onClick={closeModal} className="text-white hover:text-red-600 font-bold">&times;</button>
          </div>
          <div className="h-[420px] p-4 border border-purple-800 rounded-[16px]">
            <div className="overflow-auto h-full">
              {comments.map(comment => (
                <div key={comment._id} className="flex items-start mb-4">
                  <img src={userImg} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="text-white text-xs p-1">{comment?.userName}</p>
                    <div className="bg-purple-800  rounded-lg p-2">
                      <p className="text-sm text-white">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex p-1">
            <input 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Add a comment" 
              className="bg-purple-800 focus:outline-none rounded-[6px] h-[38px] w-full mt-3 pl-4 text-white" 
              type="text" 
            />
            <button onClick={submitComment} className="bg-purple-800 w-16 h-9 ml-2 mt-3 flex items-center justify-center rounded-[6px]">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>


        </div>
      </Modal>
      }
    </>
  );
}

export default ClientPosts;
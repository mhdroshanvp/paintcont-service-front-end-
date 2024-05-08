import React from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import chatImage from "../../assets/chat-removebg-preview.png"; 
import userImg from "../../assets/user-removebg.png"

// User profile component
const UserProfile = ({ username, profileImage }) => (
  <div className="flex items-center mb-2">
    <img src={profileImage} alt={username} className="w-10 h-10 rounded-full mr-2" />
    <h1 className="text-white">{username}</h1>
  </div>
);

function ClientChatPage() {
  return (
    <>
      <div className="w-full h-[60px]">
        <ClientNavbar />
      </div>
      <div className="flex justify-center items-center mt-5">
        <div className="rounded-[10px] border mr-5 w-[400px] h-[500px]">
          <div className="rounded-[10px] w-full h-10 mt-3">
            <h1 className="text-white mt-1 ml-5 flex justify-start">Messages</h1>
          </div>
          <div>
            <div className="border w-full h-12">
              <UserProfile username="Jayakrishnan" profileImage={userImg} />
            </div>
            <div className="border w-full h-12">
              <UserProfile username="John Doe" profileImage={userImg} />
            </div>
            <div className="border w-full h-12">
              <UserProfile username="Jane Doe" profileImage={userImg} />
            </div>
          </div>
        </div>
        <div className="border rounded-[10px] w-[700px] h-[500px]">
          <div className="flex justify-center items-center h-full">
            <img src={chatImage} alt="Chat" className="w-52 object-cover rounded-[10px]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientChatPage;

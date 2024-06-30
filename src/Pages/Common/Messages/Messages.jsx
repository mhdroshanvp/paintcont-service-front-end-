import React, { useEffect, useRef, useState } from 'react';
import ClientNavbar from '../../../Components/Clients/ClientNavbar';
import './messages.css';
import Conversations from '../../../Components/Common/Conversations/Conversations';
import Message from '../../../Components/Common/Message/Message';
import { useSelector } from 'react-redux';
import axios from '../../../Services/axiosService';
import { useParams } from 'react-router-dom';
import { socket } from '../../../socket/socket';
import chatEmpty from "../../../assets/chat-removebg-preview.png";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messageInputRef = useRef(null);

  const user = useSelector((state) => state.user);
  const userId = user?.currentUser?._id;
  const { id } = useParams();

  // Socket.io setup and cleanup
  useEffect(() => {
    socket.on("connection");
    socket.on("welcome", (data) => {
      console.log(data, "-------d------------");
    });
    return () => {
      socket.off("connection");
      socket.off("welcome");
    };
  }, []);

  // Fetch conversations based on userId or specific conversation id
  useEffect(() => {
    const getConversation = async () => {
      try {
        if (id) {
          const res = await axios.post(`conversation`, { senderId: userId, receiverId: id });
          socket.emit("joinNewUser", res.data);
          setConversations(res.data);
        } else {
          const res = await axios.get(`conversation/${userId}`);
          socket.emit("joinNewUser", res?.data);
          setConversations(res?.data);
        }
      } catch (error) {
        console.log("Error fetching conversations:", error);
      }
    };
    getConversation();
  }, [userId, id]);

  // Fetch message history for a specific conversation id
  useEffect(() => {
    const fetchMsg = async (id) => {
      try {
        const data = { userId, painterId: id };
        const response = await axios.post("/user/painter/profile/indMsg", data);
        if (response?.data?.success) {
          setMessageHistory(response?.data?.messageHistory);
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (id) {
      fetchMsg(id);
    }
  }, [id, userId]);

  // Socket.io event listener for incoming messages
  useEffect(() => {
    socket.on("sendToUser", (data) => {
      setMessageHistory((prevMessageHistory) => [...prevMessageHistory, data]);
    });

    return () => {
      socket.off("sendToUser");
    };
  }, []);

  // Function to handle sending a new message
  const chatSubmit = async () => {
    try {
      const obj = { conversationId: currentConv?._id, sender: userId, text: newMessage };
      socket.emit("sendData", obj);
      const response = await axios.post('/message/', obj);
      setNewMessage('');
      messageInputRef.current.value = ''; 
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <>
      <div>
        <ClientNavbar />
      </div>

      <div className="messenger">
        {/* <div>
          <p>Chat</p>
        </div> */}
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div>
              {!conversations.length ? (
                <p className="text-center text-sm text-red-500 mt-4">Sorry, there are no conversations available.</p>
              ) : (
                conversations.map((c) => (
                  <div  onClick={() => { setCurrentConv(c); }} key={c._id}>
                    <Conversations painterName={c?.painterName?.username} indConv={c} conversation={c} me={user} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="chatBox border">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {!messageHistory?.length ? (
                <div className="flex justify-center h-screen items-center">
                  <img src={chatEmpty} alt="" className="size-72" />
                </div>
              ) : (
                messageHistory.map((msg) => (
                  <Message own={userId === msg.sender} msgData={msg.text} key={msg._id} />
                ))
              )}
            </div>

            {currentConv && (
              <div className="chatBoxBottom">
                <textarea
                  ref={messageInputRef}
                  className="chatMessageInput"
                  placeholder="Write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={chatSubmit}>
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;

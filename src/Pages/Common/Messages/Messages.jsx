import React, { useEffect, useRef, useState, useMemo } from 'react';
import ClientNavbar from '../../../Components/Clients/ClientNavbar';
import './messages.css';
import Conversations from '../../../Components/Common/Conversations/Conversations';
import Message from '../../../Components/Common/Message/Message';
import { useSelector } from 'react-redux';
import axios from '../../../Services/axiosService';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '../../../socket/socket';
import chatEmpty from "../../../assets/chat-removebg-preview.png";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [inMessage, setInMessage] = useState('');

  const messageInputRef = useRef(null);
  const navigate = useNavigate()

  const user = useSelector((state) => state.user);
  const userId = user?.currentUser?._id;
  const { id } = useParams();

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


  useEffect(() => {
    const getConversation = async () => {
      try {
        if (id) {
          const res = await axios.post(`conversation`, { senderId: userId, receiverId: id });
          socket.emit("joinNewUser", res.data);
          setConversations(res?.data);
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
        // navigate("/user/error")
      }
    };

    if (id) {
      fetchMsg(id);
    }
  }, [id, userId]);


  useMemo(() => {
    const newConversations = [...conversations];
    const index = newConversations.findIndex(val => val._id === currentConv?._id);
  
    console.log(newConversations, "[[[]", index);
  
    if (index !== -1 && inMessage) {
      const newInMessage = { ...inMessage };
      newInMessage.createdAt = new Date();
      newConversations[index].messages = [...messageHistory, newInMessage];
  
      newConversations.sort((a, b) => {
        const dateA = a.messages[a.messages.length - 1]?.createdAt || 0;
        const dateB = b.messages[b.messages.length - 1]?.createdAt || 0;
        return new Date(dateB) - new Date(dateA);
      });
    }
  
    setConversations(newConversations);
  }, [inMessage]);
  



  useEffect(() => {
    socket.on("sendToUser", (data) => {
      console.log(data, 'test data on ')
      setMessageHistory((prevMessageHistory) => [...prevMessageHistory, data]);
      setInMessage(data)
    });


    socket.on('messagesSeen', (conversationId) => {
      console.log("entered!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
      if (conversationId === currentConv?._id) {
        const updatedMessages = messageHistory.map(msg => ({ ...msg, isSeen: true }));
        setMessageHistory(updatedMessages);
      }
    });



    return () => {
      socket.off("sendToUser");
      socket.off("messagesSeen");
    };

  }, []);


  const fetchMsgh = async (id) => {
    try {
      const response = await axios.get(`/message/${id}`);
      setMessageHistory(response?.data);
      const data = { conversationId: id }
      const updateIsSeen = await axios.post('/message/updateIsSeen', data)
    } catch (error) {
      console.log(error);
    }
  };




  
  const chatSubmit = async () => {
    try {
      const obj = { conversationId: currentConv?._id, sender: userId, text: newMessage, createdAt: new Date(Date.now()) };
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
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div>
              {!conversations.length ? (
                <p className="text-center text-sm  mt-4">Sorry, there are no conversations available.</p>
              ) : (
                conversations.map((c) => (
                  <div onClick={() => { setCurrentConv(c); fetchMsgh(c?._id); }} key={c._id}>
                    <Conversations painterId={c.members[1]} painterName={c?.painterName?.username} indConv={c} conversation={c} me={user} />
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
                  <Message own={userId === msg.sender} msgData={msg.text} msgTime={msg?.createdAt} key={msg._id} msgSeen={msg?.isSeen} />
                ))
              )}
            </div>

            {(currentConv || id) && (
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
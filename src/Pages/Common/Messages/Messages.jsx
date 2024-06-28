import React, { useEffect, useRef, useState } from 'react';
import ClientNavbar from '../../../Components/Clients/ClientNavbar';
import './messages.css';
import Conversations from '../../../Components/Common/Conversations/Conversations';
import Message from '../../../Components/Common/Message/Message';
import ChatOnline from '../../../Components/Common/Chatonline/ChatOnline';
import { useSelector } from 'react-redux';
import axios from '../../../Services/axiosService';
import { useParams } from 'react-router-dom';
import { socket } from '../../../socket/socket';

function Messages() {

  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state.user);
  const [messageHistory, setMessageHistory] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const messageInputRef = useRef(null);

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
          setConversations(res.data);
        } else {
          const res = await axios.get(`conversation/${userId}`);
          socket.emit("joinNewUser", res?.data);
          setConversations(res?.data);
        }
      } catch (error) {
        console.log("its an error");
        console.log(error);
      }
    };
    getConversation();
  }, [userId, id]);

  const fetchMsg = async (id) => {
    try {
      const data = { userId, painterId: id };
      const response = await axios.post("/user/painter/profile/indMsg", data);
      if (response?.data?.success) {
        setMessageHistory(response?.data?.messageHistory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMsgh = async (id) => {
    try {
      const response = await axios.get(`/message/${id}`);
      setMessageHistory(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        fetchMsg(id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    socket.on("sendToUser", (data) => {
      setMessageHistory((prevMessageHistory) => [...prevMessageHistory, data]);
    });

    return () => {
      socket.off("sendToUser");
    };
  }, []);

  const chatSubmit = async () => {
    try {
      const obj = { conversationId: currentConv?._id, sender: userId, text: newMessage };
      socket.emit("sendData", obj);
      const response = await axios.post('/message/', obj);
      setNewMessage(''); // Clear the state
      messageInputRef.current.value = ''; // Clear the textarea
    } catch (error) {
      console.log(error);
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
              {conversations?.map((c) => (
                <div onClick={() => { setCurrentConv(c); fetchMsgh(c?._id); }} key={c?._id}>
                  <Conversations painterName={c?.painterName?.username} indConv={c} conversation={c} me={user} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <div>
                {!messageHistory?.length &&
                  <div className='flex justify-center h-screen items-center'>
                    no items
                  </div>
                }
                {messageHistory?.map((msg) => {
                  if (userId === msg?.sender) {
                    return <Message own={true} msgData={msg?.text} key={msg?._id} />;
                  }
                  return <Message msgData={msg?.text} key={msg?._id} />;
                })}
              </div>
            </div>
            {currentConv && (
              <div className="chatBoxBottom">
                <textarea
                  ref={messageInputRef} 
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e?.target?.value)}
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

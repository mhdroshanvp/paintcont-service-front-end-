import React, { useEffect, useRef, useState } from 'react';
import './messages.css';
import Conversations from '../../../Components/Common/Conversations/Conversations';
import Message from '../../../Components/Common/Message/Message';
import { useSelector } from 'react-redux';
import axios from '../../../Services/axiosService';
import {jwtDecode} from "jwt-decode";
import { socket } from '../../../socket/socket';
import PainterNavbar from '../../../Components/Painters/PainterNavbar';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state?.user);
  const [messageHistory, setMessageHistory] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const messageInputRef = useRef(null);

  const token = localStorage?.getItem('Painter_token');
  const decode = jwtDecode(token);

  const userId = decode?.username;

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
        const res = await axios.get(`conversation/${userId}`);
        socket.emit("joinNewUser", res?.data);
        setConversations(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [userId]);

  const fetchMsgh = async (id) => {
    try {
      const response = await axios.get(`/message/${id}`);
      setMessageHistory(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        <PainterNavbar />
      </div>
      
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div>
              {conversations?.map((c) => (
                <div onClick={() => { setCurrentConv(c); fetchMsgh(c?._id); }} key={c?._id}>
                  <Conversations painterName={c?.userName?.username} indConv={c} conversation={c} me={user} />
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
                {messageHistory.map((msg) => {
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
                  ref={messageInputRef} // Attach the ref to the textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e?.target?.value)}
                  value={newMessage} // Control the textarea with state
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

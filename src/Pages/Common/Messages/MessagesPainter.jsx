import React, { useEffect, useRef, useState,useMemo } from 'react';
import './messages.css';
import Conversations from '../../../Components/Common/Conversations/Conversations';
import Message from '../../../Components/Common/Message/Message';
import { useSelector } from 'react-redux';
import axios from '../../../Services/axiosService';
import {jwtDecode} from "jwt-decode";
import { socket } from '../../../socket/socket';
import PainterNavbar from '../../../Components/Painters/PainterNavbar';
import chatEmpty from "../../../assets/chat-removebg-preview.png";


function Messages() {
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state?.user);
  const [messageHistory, setMessageHistory] = useState([]);
  const [currentConv, setCurrentConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [inMessage, setInMessage] = useState('');

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
  

  const fetchMsgh = async (id) => {
    try {
      const response = await axios.get(`/message/${id}`);
      setMessageHistory(response?.data);
      const data = {conversationId:id}
      const updateIsSeen = await axios.post('/message/updateIsSeen', data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("sendToUser", (data) => {
      console.log(data,'onnnnnnnnnnn')
      setMessageHistory((prevMessageHistory) => [...prevMessageHistory, data]);
      setInMessage(data)

    });

    return () => {
      socket.off("sendToUser");
    };
  }, []);

  const chatSubmit = async () => {
    try {
      const obj = { conversationId: currentConv?._id, sender: userId, text: newMessage ,createdAt:new Date(Date.now())};
      socket.emit("sendData", obj);
      const response = await axios.post('/message/', obj);
      setNewMessage(''); 
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
    {conversations?.length ? (
      conversations.map((c) => (
        <div onClick={() => { setCurrentConv(c); fetchMsgh(c?._id); }} key={c?._id}>
          <Conversations painterName={c?.userName?.username} indConv={c} conversation={c} me={user} />
        </div>
      ))
    ) : (
      <p className="text-center  mt-4 text-sm">Sorry, there are no conversations available.</p>
    )}
  </div>
</div>

        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper border">
            <div className="chatBoxTop">
              <div>
                {!messageHistory?.length &&
                  <div className='flex justify-center h-screen items-center'>
                    <img src={chatEmpty} alt="" className="size-72" />
                  </div>
                }
                {messageHistory.map((msg) => {
                  if (userId === msg?.sender) {
                    return <Message own={true} msgData={msg?.text} msgTime={msg?.createdAt} key={msg?._id} msgSeen={msg?.isSeen} />;
                  }
                  return <Message msgData={msg?.text} msgTime={msg?.createdAt} key={msg?._id} msgSeen={msg?.isSeen}/>;
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

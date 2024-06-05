import React, { useContext, useEffect, useRef, useState } from 'react'
import ClientNavbar from '../../../Components/Painters/PainterNavbar'
import './messages.css'
import Conversations from '../../../Components/Common/Conversations/Conversations'
import Message from '../../../Components/Common/Message/Message'
import ChatOnline from '../../../Components/Common/Chatonline/ChatOnline'
import { useSelector } from 'react-redux'
import axios from '../../../Services/axiosService'
import { useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { socket } from '../../../socket/socket'

function MessagesPainter() {

  const [conversations,setConversations] = useState([])
  const [messageHistory,setMessageHistory] = useState([])
  const [currentConv,setCurrentConv] = useState({})
  const [newMessage,setNewMessage] = useState('')

  const token = localStorage.getItem('Painter_token');
  const decode = jwtDecode(token);
 const chatBoxTop = useRef(null)
  const userId = decode.username
  const user = decode
  const {id} = useParams()
  
  
  // console.log(conversations,"conversation");
  // console.log(decode,"========");



  useEffect(()=>{
    socket.on("connection")

    socket.on("welcome",(data)=>{
      // console.log(data,"-------d------------")
    })

  },[])
  // console.log(conversations,"conversation");

  socket.on("sendToUser",(data)=>{

    if(data.conversationId===conversations[0]?._id){

      // console.log(data,"--------------------;;;;;;-")
      setMessageHistory([...messageHistory,data])
    }
  })

  // useEffect(()=>{

  //   // chatBoxTo

  // },[chatBoxTop])
  

  useEffect(()=>{
    const getConversation = async () => {
      try {
        const res = await axios.get(`conversation/${userId}`)
        setConversations(res.data)
        // console.log(res,"🕺💃🕺🪩🕺💃")
      }catch (error) {
        console.log("its an error");
        console.log(error);
      }
    }
    getConversation()
  },[userId])
    const fetchMsg = async (id) => {
    
        const data = {userId,painterId:id}
        const response = await axios.post("/user/painter/profile/indMsg",data)
        // console.log(response,"response");
        
        if(response.data.success){
          setMessageHistory(response.data.messageHistory)
        }

      }

      const fetchMsgh = async (id) => {
    
      //  console.log("--ee----");
        const response = await axios.get(`/message/${id}`)
        // console.log(response,"response");
        
       
          setMessageHistory(response.data)
        

      }

  useEffect(()=>{

    try {
      if(id){
        fetchMsg(id)
      } 
    } catch (error) {
      console.log(error);
    }
  },[])

  useEffect(() => {
    if (chatBoxTop.current) {
      chatBoxTop.current.scrollTo({
        top: chatBoxTop.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messageHistory]);
  // console.log(conversations,"=====================================");
  const chatSubmit = async () => {
    try {
   
      const obj ={conversationId:conversations[0]._id,sender:userId,text:newMessage}
      socket.emit("sendData",obj)
      const response = await axios.post('/message/',obj)
      // console.log(response,"heeeeeeeeeeeeeyyyyyyyyy");
    } catch (error) {
      console.log(error);
    }
  }


  return (
     <>
    <div>
      <ClientNavbar />
    </div>
      
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {/* {conversations.map((c) => ( */}
              <div >
                {conversations.map((c)=>(
                  <div onClick={()=>{setCurrentConv(c),fetchMsgh(c._id)}} >
                    <Conversations  painterName={c.userName.username} indConv={c} conversation={c} me={user} />
                  </div>
                ))}
              </div>
            {/* ))} */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
                <div className="chatBoxTop" ref={chatBoxTop}> 
                    <div>
                      {messageHistory.map((msg)=>{
                        if(userId == msg.sender){
                          return <Message own={true} msgData={msg.text}/>
                        }
                        return <Message  msgData={msg.text}/>
                      })}
                      

                    </div>
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    // value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton " onClick={chatSubmit}>
                    Send
                  </button>
                </div>
            {/* ) : ( */}
              {/* <span className="noConversationText">
                Open a conversation to start a chat.
              </span> */}
            {/* )} */}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            Online
            <ChatOnline />
          </div>
        </div>
      </div>

    </>
 )
}

export default MessagesPainter
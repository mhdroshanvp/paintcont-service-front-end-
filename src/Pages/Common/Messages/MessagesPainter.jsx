import React, { useContext, useEffect, useRef, useState } from 'react'
import './messages.css'
import Conversations from '../../../Components/Common/Conversations/Conversations'
import Message from '../../../Components/Common/Message/Message'
import { useSelector } from 'react-redux'
import axios from '../../../Services/axiosService'
import { useParams } from 'react-router-dom'
import {jwtDecode} from "jwt-decode"
import { socket } from '../../../socket/socket'
import PainterNavbar from '../../../Components/Painters/PainterNavbar'

function Messages() {

  const [conversations,setConversations] = useState([])
  const user = useSelector((state)=>state?.user)
  const [messageHistory,setMessageHistory] = useState([])
  const [currentConv,setCurrentConv] = useState(null)
  const [newMessage,setNewMessage] = useState('')

  const token = localStorage?.getItem('Painter_token');
  const decode = jwtDecode(token);

  const userId = decode?.username

  useEffect(()=>{
    socket.on("connection")

    socket.on("welcome",(data)=>{
      console.log(data,"-------d------------")
    })

  },[])



  useEffect(()=>{
    const getConversation = async () => {
      try {
     
          const res = await axios.get(`conversation/${userId}`)
          socket.emit("joinNewUser",res?.data)
          setConversations(res?.data)
        
      }catch (error) {
        console.log(error);
      }
    }
    getConversation()
  },[userId])


      const fetchMsgh = async (id) => {
    
          const response = await axios.get(`/message/${id}`)      
          setMessageHistory(response?.data)

      }

  socket.on("sendToUser",(data)=>{
    
    setMessageHistory([...messageHistory,data])
  })


  const chatSubmit = async () => {
    try {
   
      const obj ={conversationId:currentConv?._id,sender:userId,text:newMessage}
      socket.emit("sendData",obj)
      const response = await axios.post('/message/',obj)
    } catch (error) {
      console.log(error);
    }
  }
  


  return (
     <>
    <div>
      <PainterNavbar />
    </div>
      
    <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
              <div >
                {conversations?.map((c)=>(
                  <div onClick={()=>{setCurrentConv(c),fetchMsgh(c?._id)}} >
                    <Conversations  painterName={c?.userName?.username} indConv={c} conversation={c} me={user} />
                  </div>
                ))}
              </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <div>
                      {!messageHistory?.length&&
                      
                      <div className='flex justify-center h-screen items-center'>
                        no items
                      </div>
                      }
                      {messageHistory.map((msg)=>{
                        if(userId == msg?.sender){
                          return <Message own={true} msgData={msg?.text}/>
                        }
                        return <Message  msgData={msg?.text}/>
                      })}
                      

                    </div>
                </div>
               {currentConv&&<div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e?.target?.value)}
                  ></textarea>
                  <button className="chatSubmitButton " onClick={chatSubmit}>
                    Send
                  </button>
                </div>}
           
          </div>
        </div>
      </div>

    </>
 )
}

export default Messages
import React, { useContext, useEffect, useState } from 'react'
import ClientNavbar from '../../../Components/Clients/ClientNavbar'
import './messages.css'
import Conversations from '../../../Components/Common/Conversations/Conversations'
import Message from '../../../Components/Common/Message/Message'
import ChatOnline from '../../../Components/Common/Chatonline/ChatOnline'
import { useSelector } from 'react-redux'
import axios from '../../../Services/axiosService'
import { useParams } from 'react-router-dom'

function Messages() {

  const [conversations,setConversations] = useState([])
  const user = useSelector((state)=>state.user)
  const [messageHistory,setMessageHistory] = useState([])
  const [currentConv,setCurrentConv] = useState({})

  const userId = user.currentUser._id

  const {id} = useParams()




  useEffect(()=>{
    const getConversation = async () => {
      try {
        const res = await axios.get(`conversation/${userId}`)
        setConversations(res.data)
        console.log(res,"🕺💃🕺🪩🕺💃")
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
        console.log(response,"response");
        
        if(response.data.success){
          setMessageHistory(response.data.messageHistory)
        }

      }

      const fetchMsgh = async (id) => {
    
       console.log("--ee----");
        const response = await axios.get(`/message/${id}`)
        console.log(response,"response");
        
       
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

                    <Conversations  painterName={c.painterName.username} indConv={c} conversation={c} me={user} />
                  </div>
                ))}
              </div>
            {/* ))} */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
                <div className="chatBoxTop">
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
                    // onChange={(e) => setNewMessage(e.target.value)}
                    // value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton">
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

export default Messages
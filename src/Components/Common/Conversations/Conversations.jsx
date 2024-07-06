import React, { useEffect, useState } from 'react'
import './Conversations.css'
import img from '../../../assets/dummyUser.png'
import axios from '../../../Services/axiosService'

function Conversations({conversation,me,indConv,painterName,painterId}) {


  const [user,setUser] = useState(null)
  const [profilepic,setProfilepic]=useState('')
 useEffect(()=>{
  console.log(painterId)
    const data =async(painterId)=>{
       const out = await axios.get(`/painter/fetchpainter/${painterId}`)
       setProfilepic(out?.data?.painter?.profilePicture)
    }
    data(painterId)
 },[painterId])

  return (
    <div className='conversation sm:w-[500px] w-[60px]' >
     <img className='conversationImg' src={profilepic ? (profilepic):(img)} alt="" />
     <span className="conversationName">{painterName}</span>
    </div>
  )
}

export default Conversations
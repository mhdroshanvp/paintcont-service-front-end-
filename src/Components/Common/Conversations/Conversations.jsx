import React, { useEffect, useState } from 'react'
import './Conversations.css'
import img from '../../../assets/dummyUser.png'
import axios from '../../../Services/axiosService'

function Conversations({conversation,me,indConv,painterName}) {


  const [user,setUser] = useState(null)

  return (
    <div className='conversation sm:w-[500px] w-[60px]' >
     <img className='conversationImg' src={img} alt="" />
     <span className="conversationName">{painterName}</span>
    </div>
  )
}

export default Conversations
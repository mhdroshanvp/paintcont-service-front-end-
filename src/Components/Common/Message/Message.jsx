import React from 'react';
import './message.css';
import dummy from "../../../assets/user-removebg.png";
import { LiaCheckDoubleSolid } from "react-icons/lia";

function Message({ own, msgData, msgTime,msgSeen }) {
  const messageTime = new Date(msgTime);

  let hours = messageTime.getHours();
  const minutes = String(messageTime.getMinutes()).padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;

  const formattedTime = `${hours}:${minutes} ${period}`;

  return (
    <div className={own ? "message own" : "message"}>
      <div className={` flex  ${ own ?'flex-row-reverse':''}`}>
        <img
          className="messageImg"
          src={dummy}
          alt=""
        />

        <div className='messageText'>
        <p>{msgData}</p>
        <div className='flex'>
        <p className="messageBottom">{formattedTime}</p>
        <p className={`messageBottom  ${msgSeen == true ? 'text-blue-500' : 'text-white'}`}><LiaCheckDoubleSolid className="text-md m-1"/> </p>
      </div> 
        </div>

       
        
      </div>
      
    </div>
  );
}

export default Message;

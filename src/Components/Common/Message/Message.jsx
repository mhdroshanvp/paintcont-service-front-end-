import React from 'react'
import './message.css'
import dummy from "../../../assets/user-removebg.png"

function Message({own,msgData}) {
    return (
        <div className={own ? "message own" : "message"}>
          <div className="messageTop">
            <img
              className="messageImg"
              src={dummy}
              alt=""
            />
            <p className="messageText">{msgData}</p>
          </div>
          {/* <div className="messageBottom">{msgData}</div> */}
        </div>
      );
}

export default Message
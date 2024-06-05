import React, { useState } from 'react';
import axios from '../../Services/axiosService';
import { useNavigate } from 'react-router-dom';
import { PainterEndpoints } from '../../Services/endpoints/painter';

function PainterMail4Reset() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate( )

  const MailForSendOTP = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(PainterEndpoints.MailForReset, { email });

      // console.log(response,"response data");

      if(response.data.success){
        // console.log("inside the response data in painterMail4Reset");
        navigate('/painter/otp',{state: { userEmail: email }})
      }
    } catch (error) {   
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${
              email ? 'text-sm -translate-y-4' : 'text-base'
            }`}
          >
            Email (for sending OTP)
          </label>
          <br />
          <button
            onClick={MailForSendOTP}
            className="border text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg"
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default PainterMail4Reset;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../../Services/axiosService";
import { PainterEndpoints } from "../../Services/endpoints/painter";

function PainterOtp() {

  const [otp, setOTP] = useState('');
  const [otpFocus, setOTPFocus] = useState(false);

  const navigate = useNavigate()
  const location = useLocation()
  const {userEmail}=location.state
  const [otpError,setOtpError] = useState('')

  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  const otpSubmit = async (e) => {


    e.preventDefault();

    try {
        if(!otp){
          setOtpError('otp cannot be empty')
          return
        }
      const response = await axios.post(PainterEndpoints.Otp, { otp, email:userEmail });

      if (response.data.success) {
        // console.log("inside the response data success");
        navigate('/painter/home');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const resendOTP = async (e) => {

    // console.log(userEmail,"------------------------------------------------------------------------------");

    e.preventDefault();
    try {
      const response = await axios.post('/painter/otp/resend', { email: userEmail });

      if (response.data.success) {
        console.log("New OTP sent successfully");
        setTimer(30);
        setResendDisabled(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setResendDisabled(true);
          clearInterval(timerInterval); // Clear the interval when timer reaches 0
        }
        return prevTimer - 1;
      });
    }, 1000);
  
    // Cleanup function to clear the interval when component unmounts or when timer reaches 0
    return () => clearInterval(timerInterval);
  }, [timer]); // Include timer as a dependency
  

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
          <form onSubmit={otpSubmit}>


            <div className="relative mb-6">

              <input
                type="text"
                id="otp"
                className={`block w-full p-2 text-white border-b border-white outline-none bg-transparent peer ${otpFocus || otp ? 'pt-6' : ''}`}
                // value={otp}
                onChange={(e) => setOTP(e.target.value)}
                onFocus={() => setOTPFocus(true)}
                onBlur={() => setOTPFocus(false)}
                
              />
              <h1 className='text-white '>Otp send to the {userEmail}</h1>
              <label
                htmlFor="otp"
                className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${otpFocus || otp ? 'text-xs' : 'text-sm'}`}
              >
                Enter OTP
              </label>
              
            </div>
            <button type='submit' className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg">
              Verify OTP
            </button>

            {otpError&&<p className="text-sm">{otpError}</p>}

            <div className="flex w-full justify-end p-2 space-x-2">
              {timer > 0 ? (
                <span className="text-white opacity-10 text-sm">Resend OTP in {timer} seconds</span>
              ) : (
                <button onClick={resendOTP} className="text-sm text-white opacity-10" >Resend OTP</button>
              )}
            </div>


            
          </form>
        </div>
      </div>
    </>
  );
}
export default PainterOtp;

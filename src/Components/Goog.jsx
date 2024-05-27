
import { FaGoogle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "../../src/Services/axiosService"; 
import { GoogleLogin } from '@react-oauth/google';

import React, { useEffect, useState } from 'react'; import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function GoogleAuthSignup() {
   

    return (
        <div className='flex items-center justify-center text-center rounded-xl p-5'>
           
            <GoogleLogin  
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log(decoded)                   
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            /> 


        </div>
  );
}

export default GoogleAuthSignup;
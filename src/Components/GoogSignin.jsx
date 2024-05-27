import React from 'react'
import jwt from 'jsonwebtoken'
import {jwtDecode} from 'jwt-decode'
import axios from '../Services/axiosService'
import { useDispatch } from 'react-redux'


function GoogSignin() {

    const dispatch = useDispatch()

    const handleSubmit = async(e,formData) => {
        console.log(formData);
        // const result = await axios.post('/auth/login',formData)
        // .then(response => {
        //   console.log('Response:', response.data);
        //   dispatch(signInSuccess(response.data)) 
        // })
        // .catch(error => {
        //   console.error('Error:', error);
        // });
        console.log(result,'responce')
    }

    return (
    <div className='flex items-center justify-center text-center rounded-xl p-5'>

    <GoogleLogin onSuccess={credentialResponse => {
            console.log(credentialResponse);
            const decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded)
            
        //    if(decoded?.email_verified){
        //     const formData = {
        //         name:decoded.name,
        //         email:decoded.email,
        //         googleAuth:true
        //     }
        //     handleSubmit(Event,formData);  
        //    }
        }}
        onError={() => {
            console.log('Login Failed');
        }}
    /> 

</div>
    )
}

export default GoogSignin
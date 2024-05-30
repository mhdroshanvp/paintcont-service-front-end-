import React, { useState } from 'react';
import axios from '../../Services/axiosService';
import { useNavigate } from 'react-router-dom';
import { UserEndpoints } from '../../Services/endpoints/user';
import ClientMail4Forget from '../../Components/Clients/ClientMail4Forget';
import ClientOtp from '../../Components/Clients/ClientOtpReset';

function ClientMail4Reset() {
    const [isopen, setisopen] = useState(null);
   if(!isopen){

       return (
        //    <></>
             <ClientMail4Forget setisopen={setisopen}/>
           
       );
   }else{
    return <ClientOtp userEmail={isopen.userEmail}/>
   }
}

export default ClientMail4Reset;

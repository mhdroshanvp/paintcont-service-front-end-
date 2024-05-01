import React, { useState } from 'react'

function PainterResetPass() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    

    return (
       <>
         <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
             <h2 className="text-white text-center mb-8 font-serif text-4xl">Change Password</h2>
             <form>
               <div className="relative mb-6">
                 <input
                   type="password"
                   id="password"
                   className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   required
                 />
                 <label
                   htmlFor="username"
                   className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${username ? 'text-sm -translate-y-4' : 'text-base'}`}
                 >
                   New Password
                 </label>
               </div>
               <div className="relative mb-6">
                 <input
                   type="password"
                   id="password"
                   className="block w-full p-2 text-white border-b border-white outline-none bg-transparent peer"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
                 <label
                   htmlFor="password"
                   className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 ${password ? 'text-sm -translate-y-4' : 'text-base'}`}
                 >
                   Confirm Password
                 </label>
               </div>
               <a  className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg">
                 Submit
               </a>
             </form>
           </div>
         </div>
       </>
    );
}

export default PainterResetPass

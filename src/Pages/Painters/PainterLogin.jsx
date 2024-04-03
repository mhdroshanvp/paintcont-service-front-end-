import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa';

function PainterLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
   
    return (
       <>
         <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#200a31] to-[#1f3752]">
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-10 bg-black bg-opacity-50 rounded-lg shadow-lg">
             <h2 className="text-white text-center mb-8 font-serif text-4xl">Painter Login</h2>
             <form>
               <div className="relative mb-6">
                 <input
                   type="text"
                   id="username"
                   className={`block w-full p-2 text-white border-b border-white outline-none bg-transparent peer ${usernameFocus || username ? 'pt-6' : ''}`}
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                   onFocus={() => setUsernameFocus(true)}
                   onBlur={() => setUsernameFocus(false)}
                   required
                 />
                 <label
                   htmlFor="username"
                   className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${usernameFocus || username ? 'text-xs' : 'text-sm'}`}
                 >
                   Username
                 </label>
               </div>
               <div className="relative mb-6">
                 <input
                   type="password"
                   id="password"
                   className={`block w-full p-2 text-white border-b border-white outline-none bg-transparent peer ${passwordFocus || password ? 'pt-6' : ''}`}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   onFocus={() => setPasswordFocus(true)}
                   onBlur={() => setPasswordFocus(false)}
                   required
                 />
                 <label
                   htmlFor="password"
                   className={`absolute top-0 left-0 p-2 text-white transition-all duration-500 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${passwordFocus || password ? 'text-xs' : 'text-sm'}`}
                 >
                   Password
                 </label>
                 <div className="flex w-full justify-end">
                   <a href="#" target="_blank" className="text-sm text-white opacity-10">forget password</a>
                 </div>
               </div>
               <a href="#" className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#FF6B00] hover:text-black hover:shadow-lg rounded-lg">
                 Submit
               </a>
               <div className="flex w-full justify-center p-2 space-x-2">
                 <span className='text-white opacity-10 text-sm'>Don't have an account?</span>
                 <a href="#" target="_blank" className="text-sm text-white opacity-10"> Sign-up</a>
               </div>
               <a href="#" className="border 1px text-center inline-block w-full px-6 py-4 text-white text-uppercase font-bold text-lg transition-all duration-500 hover:bg-[#03e9f4] hover:text-black hover:shadow-lg rounded-lg">
                 <FaGoogle className="inline-block mr-2" /> continue with Google
               </a>
             </form>
           </div>
         </div>
       </>
    );
}

export default PainterLogin

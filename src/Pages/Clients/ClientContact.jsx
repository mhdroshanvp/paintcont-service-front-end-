import React, { useState } from 'react';
import axios from '../../Services/axiosService';
import ClientNavbar from '../../Components/Clients/ClientNavbar';
import painter from "../../assets/roller.gif";
import toast, { Toaster } from "react-hot-toast";

function ClientContact() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/contact', formData);
      if (response.data.success) {
        toast.success('Message sent successfully');
        setFormData({
          name: '',
          mail: '',
          message: ''
        });
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <ClientNavbar />
      </div>
      <div className='sm:flex sm:justify-center sm:h-[600px] sm:items-center h-[500px] sm:ml-14 xl:ml-4 mt-10'>
        <div className='sm:w-[600px] xl:ml-9 sm:h-[600px] h-[300px] flex justify-center'>
          <img src={painter} alt="" className='sm:w-[600px] sm:h-[600px] w-[300px] h-[300px] rounded-[30px]' />
        </div>
        <div className='bg-[#4a206f] ml-[50px] sm:w-[600px] xl:ml-9 sm:h-[600px] sm:ml-10 sm:mt-0 w-[400px] rounded-[30px] h-[420px]'>
          <form onSubmit={handleSubmit} className='sm:mt-[100px] mt-[30px] pt-3'>
            <div className='flex justify-center mb-3'>
              <input
                type="text"
                name="name"
                placeholder='Name'
                className="w-96 h-11 rounded-[10px] bg-purple-800 focus:outline-none mt-3 pl-4 text-white"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-center mb-3'>
              <input
                type="email"
                name="mail"
                placeholder='Email'
                className="w-96 h-11 rounded-[10px] bg-purple-800 focus:outline-none mt-3 pl-4 text-white"
                value={formData.mail}
                onChange={handleChange}
              />
            </div>
            <div className='flex justify-center mb-3'>
              <textarea
                name="message"
                placeholder='Message'
                className='w-96 h-[200px] rounded-[10px] bg-purple-800 focus:outline-none mt-3 pl-4 text-white'
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className='flex justify-center sm:mt-7 mt-3'>
              <button type="submit" className='w-20 h-10 rounded-[16px] bg-purple-800 text-white hover:bg-purple-900 hover:text-green-500'>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientContact;

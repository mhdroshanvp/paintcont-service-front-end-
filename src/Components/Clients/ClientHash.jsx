import axios from '../../Services/axiosService';
import React, { useState, useEffect } from 'react';

function ClientHash() {
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const response = await axios.post('/user/hashtags');
        if (response.data.success) {
          setPainters(response.data.painters);
        }
      } catch (error) {
        console.error('Error fetching painters:', error);
      }
    };
    fetchPainters();
  }, []);

  return (
    <>
      <div className="sm:ml-10 sm:mt-3 w-[430px] sm:rounded-[22px] bg-[#350e5267]">
        <p className='text-white text-opacity-35 font-openSans ml-9 py-4'># Hashtags</p>
        <div className='flex flex-wrap p-2 h-80 '>
          {painters.map((painter) => 
            painter.specialised.map((specialisation, index) => (
              <p key={index} className='bg-[#431c61c9] text-white text-opacity-50 w-24 h-7 m-1 rounded-[8px] flex justify-center items-center'>
                {specialisation}
              </p>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ClientHash;

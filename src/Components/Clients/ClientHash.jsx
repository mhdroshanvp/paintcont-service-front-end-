import axios from '../../Services/axiosService';
import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaClipboard, FaCheck } from 'react-icons/fa'; // Using react-icons for the clipboard and check icons

function ClientHash() {
  const [painters, setPainters] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null); // Track the index of the copied item

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
        <p className='text-white text-opacity-35 font-openSans ml-9 py-4'>#Hashtags [ Copy hashtags for Searching ]</p>
        <div className='flex flex-wrap p-2 h-[200px]'>
          {painters.map((painter, painterIndex) => 
            painter.specialised.map((specialisation, index) => (
              <div key={index} className='bg-[#431c61c9] text-white text-opacity-50 w-32 h-8 my-0.5 mx-1 rounded-[8px] flex justify-center items-center relative'>
                <p className='text-sm'>{specialisation}</p>
                <CopyToClipboard text={specialisation} onCopy={() => setCopiedIndex(`${painterIndex}-${index}`)}>
                  {copiedIndex === `${painterIndex}-${index}` ? (
                    <FaCheck className='ml-2 text-sm' />
                  ) : (
                    <FaClipboard className='ml-2 cursor-pointer text-sm' />
                  )}
                </CopyToClipboard>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ClientHash;

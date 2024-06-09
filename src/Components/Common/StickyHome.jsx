import React from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Import an upward-pointing arrow icon

function StickyHome({scrollToTop}) {

  return (
    <button 
      className="bg-[#761eba] text-white w-16 h-16 flex items-center justify-center rounded-full hover:bg-[#67348b]"
      onClick={scrollToTop}
    >
      <FaArrowUp size={24} />
    </button>
  );
}

export default StickyHome;
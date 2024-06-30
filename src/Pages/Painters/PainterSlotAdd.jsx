import React, { useState, useRef, useEffect } from 'react';
import PainterNavbar from '../../Components/Painters/PainterNavbar';
import axios from '../../Services/axiosService';
import { PainterEndpoints } from '../../Services/endpoints/painter';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment/moment';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';

function PainterSlotAdd() {
  const [slots, setSlots] = useState([{ date: '', amount: '' }]);
  

  const token = localStorage.getItem("Painter_token");
  const decode = jwtDecode(token);
  const painterId = decode.username;

  const handleInputChange = (index, event) => {
    const values = [...slots];
    values[index][event.target.name] = event.target.value;
    setSlots(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const slot of slots) {
      if (!slot.date && !slot.amount) {
        toast.error("Date and Amount are required for all slots");
        return;
      }
      if(!slot.date){
        toast.error("Date required for slots");
        return;
      }
      if(!slot.amount){
        toast.error("amount required for slots");
        return;
      }
      if (moment(slot.date).isBefore(moment().startOf('day'))) {
        toast.error("Date cannot be in the past");
        return;
      }
    }

    try {
      await axios.post(`/painter/create-slot/${painterId}`, { slots });
      toast.success("Slots created successfully");
      setSlots([{ date: '', startTime: '', endTime: '', amount: '' }]);
      console.log('Slots submitted successfully:', { slots });
    } catch (error) {
      console.error('Error submitting slots:', error);
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <PainterNavbar />
      </div>
      <div className="flex justify-center h-[600px] items-center ">
        <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-[10px] p-8 bg-[#50187b] shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-white">Add Slots</h2>
          <div className="max-h-60 overflow-y-auto">
            {slots.map((slot, index) => (
              <div key={index} className="mb-2 pb-4">
                <label className="block text-white mb-2">
                  Date:
                  <input
                    type="date"
                    name="date"
                    value={slot.date}
                    onChange={(event) => handleInputChange(index, event)}
                    className="w-full mt-1 p-2 border rounded bg-purple-800"
                  />
                </label>
                <label className="block text-white mb-2">
                  Amount:
                  <input
                    type="number"
                    placeholder='500₹'
                    name="amount"
                    value={slot.amount}
                    onChange={(event) => handleInputChange(index, event)}
                    className="w-full mt-1 p-2 border rounded bg-purple-800"
                  />
                </label>
              </div>
            ))}
          </div>
          <div className='flex justify-between'>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">Submit Slots</button>
          <div  type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded mt-4 w-[125px]">
             <Link to={"/painter/dashboard"}>
             Edit Slot's
             </Link>
          </div>

          </div>
        </form>
      </div>
    </>
  );
}

export default PainterSlotAdd;

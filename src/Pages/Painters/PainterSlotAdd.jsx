import React, { useState, useRef, useEffect } from 'react';
import PainterNavbar from '../../Components/Painters/PainterNavbar';
import Modal from 'react-modal';
import axios from '../../Services/axiosService';
import { PainterEndpoints } from '../../Services/endpoints/painter';
import {jwtDecode} from 'jwt-decode';
import moment from 'moment/moment';
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function PainterSlotAdd() {
  const [slots, setSlots] = useState([{ date: '', startTime: '', endTime: '', amount: '' }]);
  const [editedSlot, setEditedSlot] = useState({ date: '', startTime: '', endTime: '', amount: '' });
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(null);
  const slotsEndRef = useRef(null);

  const token = localStorage.getItem("Painter_token")
  const decode = jwtDecode(token)
  const painterId = decode.username

  const handleInputChange = (index, event) => {
    const values = [...slots];
    values[index][event.target.name] = event.target.value;
    setSlots(values);
  };

  const handleAddSlot = () => {
    setSlots([...slots, { date: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveSlot = (index) => {
    const values = [...slots];
    values.splice(index, 1);
    setSlots(values);
  };

  const handleEditSlot = (index) => {
    setCurrentSlotIndex(index);
    setEditedSlot(slots[index]);
    setModalIsOpen(true);
  };

  const handleModalInputChange = (event) => {
    setEditedSlot({ ...editedSlot, [event.target.name]: event.target.value });
  };

  const handleSaveEdit = () => {
    if (moment(editedSlot.date).isBefore(moment().startOf('day'))) {
      toast.error("Date cannot be in the past");
      return;
    }
    if (!editedSlot.date || !editedSlot.amount) {
      toast.error("Date and Amount are required");
      return;
    }


    const updatedSlots = [...slots];
    updatedSlots[currentSlotIndex] = editedSlot;
    setSlots(updatedSlots);
    setModalIsOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    for (const slot of slots) {
      if (!slot.date || !slot.amount) {
        toast.error("Date and Amount are required for all slots");
        return;
      }
      if (moment(slot.date).isBefore(moment().startOf('day'))) {
        toast.error("Date cannot be in the past");
        return;
      }
    }

    try {
      await axios.post(`/painter/create-slot/${painterId}`, { slots });
      toast.success("Slots created successfully")
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
                <button
                  type="button"
                  onClick={() => handleEditSlot(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4 flex items-center"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">Submit Slots</button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="absolute inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75"
        closeTimeoutMS={200}
      >
        <div className="bg-white rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-xl mb-4">Edit Slot</h2>
          <label className="block text-gray-700 mb-2">
            Date:
            <input
              type="date"
              name="date"
              value={editedSlot.date}
              onChange={handleModalInputChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </label>
          <label className="block text-gray-700 mb-2">
            Amount:
            <input
              type="number"
              name="amount"
              value={editedSlot.amount}
              onChange={handleModalInputChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </label>
          <div className="flex justify-end">
            <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Save
            </button>
            <button onClick={() => setModalIsOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded mt-4 ml-2">
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PainterSlotAdd;

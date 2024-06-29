import React, { useState, useEffect } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import Modal from "react-modal";
import {jwtDecode} from 'jwt-decode'; // corrected import statement
import axios from "../../Services/axiosService";
import { UserEndpoints } from "../../Services/endpoints/user";
import toast, { Toaster } from "react-hot-toast";

function ClientProfile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ houseNo: "", location: "", pin: "" });
  const [user, setUser] = useState(null);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [editDetailsModalIsOpen, setEditDetailsModalIsOpen] = useState(false);
  const [name, setName] = useState(""); // Added state for name
  const [houseNo, setHouseNo] = useState(""); // Added state for houseNo
  const [location, setLocation] = useState(""); // Added state for location
  const [pin, setPin] = useState(""); // Added state for pin

  const token = localStorage.getItem('token');
  const decode = jwtDecode(token);
  const userID = decode?.username

  // console.log(userID,"---------------0000000000000000----------------");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(UserEndpoints.userProfile(decode?.username));
        setUser(response.data.user);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, [decode?.username]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openPasswordModal = () => {
    setPasswordModalIsOpen(true);
  };

  const closePasswordModal = () => {
    setPasswordModalIsOpen(false);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    // if (!address.houseNo && !address.location && !address.pin) {
    //   return toast.error("Address cannot be empty");
    // }
    // if (!address.houseNo || isNaN(address.houseNo)) {
    //   return toast.error("Please enter a valid house number.");
    // }
    // if (!address.location) {
    //   return toast.error("Location cannot be empty.");
    // }
    // if (!address.pin || !/^(\d{6})$/.test(address.pin)) {
    //   return toast.error("Invalid pin code. Please enter a 6-digit pin code.");
    // }
    // if (!phone) {
    //   return toast.error("Number cannot be empty.");
    // }

    try {
      const data = {
        phoneNo: phone,
        address: { ...address },
        userId: userID
      };

      console.log(data,"-----------------");

      const response = await axios.patch('/user/add-address', data);
      toast.success("Address updated successfully!");
      setPhone("");
      setUser(response.data.user); // Update user state with the updated address
      closeModal();
    } catch (error) {
      console.log("Error adding address:", error);
      toast.error("Failed to update address. Please try again.");
    }
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const passwordValidation = (e) => {
    const trimmedPassword = e.target.value.trim();
    setNewPassword(trimmedPassword);

    if (trimmedPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordError) {
      console.log("Fix the errors before submitting");
      return;
    }
    try {
      const data = {
        userId: userID,
        newPassword: newPassword
      };
      await axios.patch(UserEndpoints.changePassword, data);
      closePasswordModal();
    } catch (error) {
      console.log("Error changing password:", error);
    }
  };

  const toggleEditDetailsModal = () => {
    setEditDetailsModalIsOpen((prevIsOpen) => !prevIsOpen);
  };



  const handleEditDetSumbit = async (e) => {
    e.preventDefault();

    
    
    // Prepare data to send
    const data = {
      name,
      phone,
      houseNo,
      location,
      pin,
      userId: userID,
      };
      
      console.log("in the function ");
    try {
      const response = await axios.put(UserEndpoints.updateUserProfile, data );
      // console.log(response,"response");
      setUser(response.data.user);
      toast.success("User details updated successfully!");
      setEditDetailsModalIsOpen(false); // Close the modal
    } catch (error) {
      console.log("Error updating user details:", error);
      toast.error("Failed to update user details. Please try again.");
    }
  };

  return (
    <>
      <ClientNavbar />
      <Toaster />
      <div className="flex items-center justify-center h-screen ">
        <div className="flex flex-col items-center bg-gradient-to-br from-purple-950 to-purple-950 rounded-3xl shadow-2xl p-8 h-[420px] w-96">
          <div className="bg-purple-900 rounded-full overflow-hidden w-24 h-24 mb-4">
            <img
              src="/profileIcon.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center">
            {user ? (
              <>
                <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">{user.username}</div>
                <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">{user.email}</div>
                <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">
                  {user.address ? `${user.address.houseNo}, ${user.address.location}, ${user.address.pin}` : "No address available"}
                </div>
              </>
            ) : (
              <>
                <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">username</div>
                <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">email</div>
                <div className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-64">location,address,pin</div>
              </>
            )}
          </div>

          <div>
            <button onClick={openModal} className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-32">Add Address</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Add Post Modal" className="absolute inset-0 flex items-center justify-center" overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75" closeTimeoutMS={200}>
              <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                <h5>Phone No:</h5>
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="90XXXXXXXX"
                  type="text"
                />
                <h5>Address</h5>
                <input
                  name="houseNo"
                  value={address.houseNo}
                  onChange={handleAddressChange}
                  className="border py-2 px-4 mb-4 w-full h-8"
                  placeholder="House No"
                  type="text"
                />
                <input
                  name="location"
                  value={address.location}
                  onChange={handleAddressChange}
                  className="border py-2 px-4 mb-4 w-full h-8"
                  placeholder="Location"
                  type="text"
                />
                <input
                  name="pin"
                  value={address.pin}
                  onChange={handleAddressChange}
                  className="border py-2 px-4 mb-4 w-full h-8"
                  placeholder="Pin"
                  type="text"
                />
                <button onClick={handleAddressSubmit} className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none">Submit</button>
                <button onClick={closeModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Close</button>
              </div>
            </Modal>
          </div>

          <button onClick={openPasswordModal} className="text-purple-800 border-purple-700 hover:text-purple-600">Change Password</button>

          <Modal isOpen={passwordModalIsOpen} onRequestClose={closePasswordModal} contentLabel="Password Change Modal" className="absolute inset-0 flex items-center justify-center" overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75" closeTimeoutMS={200}>
            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
              <h2 className="text-xl mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange}>
                <input
                  name="newPassword"
                  value={newPassword}
                  onChange={passwordValidation}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="New Password"
                  type="password"
                />
                {passwordError && <p className="text-red-500 mb-4">{passwordError}</p>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Change Password</button>
                <button onClick={closePasswordModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Close</button>
              </form>
            </div>
          </Modal>

          <button onClick={toggleEditDetailsModal} className=" text-purple-800 border-purple-700 hover:text-purple-600">Edit Details</button>
          
          <Modal isOpen={editDetailsModalIsOpen} onRequestClose={toggleEditDetailsModal} contentLabel="Edit Details Modal" className="absolute inset-0 flex items-center justify-center" overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75" closeTimeoutMS={200}>
            <div className="bg-white rounded-lg p-8 max-w-lg w-full">
              <h2 className="text-xl mb-4">Edit Details</h2>
              <form onSubmit={handleEditDetSumbit}>
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="Name"
                  type="text"
                />
                <input
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="Phone"
                  type="text"
                />
                <input
                  name="houseNo"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="House No"
                  type="text"
                />
                <input
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="Location"
                  type="text"
                />
                <input
                  name="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="border py-2 px-4 mb-4 w-full"
                  placeholder="Pin"
                  type="text"
                />
                <button type="submit" className="bg-purple-900 text-white px-4 py-2 rounded-md">Submit</button> 
              </form>
                <button onClick={toggleEditDetailsModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Close</button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ClientProfile;
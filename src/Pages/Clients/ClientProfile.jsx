import React, { useState, useEffect } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import Modal from "react-modal";
import { jwtDecode } from 'jwt-decode';
import axios from "../../Services/axiosService";
import { UserEndpoints } from "../../Services/endpoints/user";


function ClientProfile() {
  const token=localStorage.getItem('token')
  const decode= jwtDecode(token)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ houseNo: "",location: "",pin: "", });
  const [user, setUser] = useState(null);

  console.log(address,"address");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(UserEndpoints.userProfile(decode?.username));
        console.log(response);
        setUser(response.data.user); 
      }catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(address,"<<<<<<<<<<<<<<<<<<<<<<<");
      const data = {
        phoneNo: phone,
        address: { ...address },
        userId:user?._id
      };
      const response = await axios.patch('/user/add-address', data);
      console.log(response,"from the client profile");
      setPhone("");
      // setAddress({ houseNo: "", location: "", pin: "" });
      setUser(response.data.user)
      closeModal();
    }catch (error) {
      console.log("Error adding address:", error);
    }
  }

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  console.log(user,";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");

  return (
    <>
      <ClientNavbar />
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
  {user.address? `${user.address.houseNo}, ${user.address.location}, ${user.address.pin}` : "No address available"}
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
            <button onClick={openModal} className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 rounded-md focus:outline-none w-32">AddAddress</button>
            {/* Modal component */}
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

                <div className="flex justify-between">
                  <button onClick={handleAddressSubmit} className="bg-slate-600 text-white py-2 px-6 rounded-lg mr-4">Save</button>
                  <button onClick={closeModal} className="bg-red-800 text-white py-2 px-6 rounded-lg">Close Modal</button>
                </div>
              </div>
            </Modal>

            <button className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 ml-4 rounded-md focus:outline-none w-28">Transaction</button>
          </div>
            {/* <button className="bg-purple-900 text-white border-b-2 border-purple-700 px-4 py-2 mb-2 ml-4 rounded-md focus:outline-none w-28">Save</button> */}
        </div>
      </div>
    </>
  );
}

export default ClientProfile;

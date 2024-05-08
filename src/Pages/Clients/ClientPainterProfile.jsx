import React, { useState, useRef } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import Modal from "react-modal";
import toast from "react-hot-toast";
import uploadImageToFirebase from "../../Services/firebaseconfig/imageUploader";
import axios from "../../Services/axiosService";
import { jwtDecode } from "jwt-decode";
import { UserEndpoints } from "../../Services/endpoints/user";


function ClientPainterProfile() {
  // State to manage modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const descriptionRef = useRef(null);
  const token = localStorage.getItem("Painter_token");
  const decode = jwtDecode(token);
  const id = decode.username;

  

  console.log(decode, "[[[[]]]]]]]]");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (selectedAvatar) {
      try {
        const fileUrl = await uploadImageToFirebase(selectedAvatar, "test/");
        if (!fileUrl) return toast.error("Error uploading files");
        console.log("Uploaded URL:", fileUrl);

        console.log(id, decode.username, "oooooooooo");
        // Access description value using useRef
        console.log("Description:", descriptionRef.current.value);

        const data = {
          imageUrl: fileUrl,
          description: descriptionRef.current.value,
          painterId: id,
        };
        console.log(data, "dat");

        const urlImg = await axios.post(UserEndpoints.UserPainterProfile, { data });
        setDescription("");
        closeModal();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log("No image selected");
    }
  };

  const handleAvatarChange = (files) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedAvatar(selectedFile);
      setPreviewAvatar(URL.createObjectURL(selectedFile)); // Create object URL for preview
    } else {
      setSelectedAvatar(null);
      setPreviewAvatar(null);
    }
  };  

  console.log(selectedAvatar);
  return (
    <>
      <ClientNavbar />
      <div className="linear-gradient(to right, #200a31, #1f3752)">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6 fixed mt-6">
                <div className="flex flex-col items-center">
                  <img
                    src="/profileIcon.png"
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="Profile"
                  />{" "}
                  <h1 className="text-xl font-bold">Painter Name</h1>
                  <p className="text-gray-700">Professional Painter</p>
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Follow
                    </a>
                    <a
                      href="#"
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                    >
                      Message
                    </a>
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                    specialised :
                  </span>
                  <ul>
                    <li className="mb-2">interior</li>
                    <li className="mb-2">interior</li>
                    <li className="mb-2">interior</li>
                    <li className="mb-2">interior</li>
                    <li className="mb-2">interior</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6 mt-7">
                {/* Conditional rendering for Add Post button */}
                {!modalIsOpen && (
                  <div className="relative inline-block m-2">
                    {/* Button to open modal */}
                    <button
                      className="border-transparent relative z-10 py-2 px-3 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-blue-900 to-indigo-700"
                      onClick={openModal}
                    >
                      Add Post
                    </button>
                  </div>
                )}

                {/* Modal component */}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Add Post Modal"
                  className="absolute inset-0 flex items-center justify-center"
                  overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75"
                  closeTimeoutMS={200} // Adjust modal close animation time
                >
                  <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">Add Post</h2>
                    <input
                      type="file"
                      className="py-2 px-4 text-white rounded-full mb-4"
                      accept="image/*"
                      onChange={(e) => handleAvatarChange(e.target.files)}
                    />
                    <div className="w-40 h-40 mb-4">
                      <img
                        src={previewAvatar}
                        alt="Profile Pic"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <input
                      className="border py-2 px-4 mb-4 w-full"
                      placeholder="Type post description"
                      type="text"
                      name="description"
                      id="description"
                      ref={descriptionRef}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <button
                        onClick={handlePostSubmit}
                        className="bg-slate-600 text-white py-2 px-6 rounded-lg mr-4"
                      >
                        Save
                      </button>
                      <button
                        onClick={closeModal}
                        className="bg-red-800 text-white py-2 px-6 rounded-lg"
                      >
                        Close Modal
                      </button>
                    </div>
                  </div>
                </Modal>

                <h2 className="text-xl font-bold mt-6 mb-4">About Me</h2>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  finibus est vitae tortor ullamcorper, ut vestibulum velit
                  convallis. Aenean posuere risus non velit egestas suscipit.
                  Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis
                  in faucibus orci luctus et ultrices posuere cubilia Curae;
                  Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                  luctus risus rhoncus id.
                </p>

                <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-700 mr-2">at ABC Company</span>
                      <span className="text-gray-700">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-700 mr-2">at ABC Company</span>
                      <span className="text-gray-700">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between flex-wrap gap-2 w-full">
                    <span className="text-gray-700 font-bold">
                      Web Developer
                    </span>
                    <p>
                      <span className="text-gray-700 mr-2">at ABC Company</span>
                      <span className="text-gray-700">2017 - 2019</span>
                    </p>
                  </div>
                  <p className="mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    finibus est vitae tortor ullamcorper, ut vestibulum velit
                    convallis. Aenean posuere risus non velit egestas suscipit.
                  </p>
                </div>

                <div className="flex flex-col bg-white h-[35rem] w-[50rem] rounded-2xl mb-6">
          <p className="m-3 uppercase font-semibold">Available slots:</p>

          {/* First set of blocks */}
          <div className="flex flex-col sm:flex-row items-center justify-center m-5">
            <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            </div>
            <div className="flex flex-col items-center justify-center mt-5 sm:mt-0">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            </div>
          </div>

          {/* "Afternoon" text */}
          <p className="text-center mt-5 mb-2 uppercase font-semibold ">After noon:</p>

          {/* Second set of blocks */}
          <div className="flex flex-col sm:flex-row items-center justify-center m-5">
            <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> 12:00 am</div>
            </div>
            <div className="flex flex-col items-center justify-center mt-5 sm:mt-0">
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            <div className="bg-gray-400 text-center p-3 px-6 m-2 max-w-52 min-w-52 uppercase"> no slot Available</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center justify-center m-5">
            <div className="bg-amber-500 rounded-lg p-3 m-2">
              <p>Add new slot</p>
            </div>
            <div className="bg-orange-900 p-3 rounded-lg">
              <p>Edit slot</p>
            </div>
          </div>
        </div>

        {/* My posts  */} 

        <div className=" min-w-[90rem] max-auto rounded-2xl bg-[#0D0E26] min-h-[30rem]">
              
        </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientPainterProfile
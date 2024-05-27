import React, { useState, useRef, useEffect } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import uploadImageToFirebase from "../../Services/firebaseconfig/imageUploader";
import axios from "../../Services/axiosService";
import {jwtDecode} from "jwt-decode";
import { PainterEndpoints } from "../../Services/endpoints/painter";

function PainterProfile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [painter, setPainter] = useState(null);

  const descriptionRef = useRef(null);
  const token = localStorage.getItem("Painter_token");
  const decode = jwtDecode(token);
  const id = decode.username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(PainterEndpoints.painterProfile(id));
        if (response.data) {
          setPainter(response.data.painter);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
        toast.error("Failed to fetch painter profile data");
      }
    };
    fetchUser();
  }, [id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openDetailsModal = () => {
    setDetailsModalIsOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalIsOpen(false);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (selectedAvatar) {
      try {
        const fileUrl = await uploadImageToFirebase(selectedAvatar, "test/");
        if (!fileUrl) return toast.error("Error uploading files");

        const data = {
          imageUrl: fileUrl,
          description: descriptionRef.current.value,
          painterId: id,
        };

        await axios.post(PainterEndpoints.Profile, { data }); // Correct request format
        
        setDescription("");
        closeModal();
        toast.success("Post created successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    } else {
      toast.error("No image selected");
    }
  };

  const handleAvatarChange = (files) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error("Invalid file format. Please select an image (JPEG, PNG, GIF).");
        setSelectedAvatar(null);
        setPreviewAvatar(null);
        return;
      }

      if (selectedFile.size > maxSizeInBytes) {
        toast.error("File size exceeds the maximum limit of 5MB.");
        setSelectedAvatar(null);
        setPreviewAvatar(null);
        return;
      }

      setSelectedAvatar(selectedFile);
      setPreviewAvatar(URL.createObjectURL(selectedFile));
    } else {
      setSelectedAvatar(null);
      setPreviewAvatar(null);
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const details = {
      age: formData.get("age"),
      experienceYears: formData.get("experienceYears"),
      location: formData.get("location"),
      phone: formData.get("phone"),
      specialised: formData.get("specialised").split(","),
      aboutMe: formData.get("aboutMe"),
    };

    try {
      await axios.post(PainterEndpoints.updateDetails(id), details);
      toast.success("Details updated successfully");
      closeDetailsModal();
    } catch (error) {
      toast.error("Failed to update details");
      console.error("Error updating details:", error);
    }
  };

  return (
    <>
      <div className="w-full fixed z-20">
        <ClientNavbar />
      </div>

      <div className="linear-gradient(to right, #200a31, #1f3752)">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6 fixed mt-6">
                <div className="flex flex-col items-center">
                  <img
                    src={painter?.avatarUrl || "/profileIcon.png"}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="Profile"
                  />
                  <h1 className="text-xl font-bold">{painter?.username || "Painter Name"}</h1>

                  <p className="text-gray-700">
                    {` ${painter?.experienceYears || "0"} years of experience`}
                  </p>

                  <p>{painter?.phone}</p>

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
                    Specialised:
                  </span>
                  <ul>
                    {painter?.specialised.map((speciality, index) => (
                      <li key={index} className="mb-2">{speciality}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6 mt-7">
                {!modalIsOpen && !detailsModalIsOpen && (
                  <div className="relative inline-block m-2">
                    <button
                      className="border-transparent relative z-10 py-2 px-3 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-blue-900 to-indigo-700"
                      onClick={openModal}
                    >
                      Add Post
                    </button>

                    <button
                      className="ml-4 border-transparent relative z-10 py-2 px-3 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-lime-900 to-teal-500"
                      onClick={openDetailsModal}
                    >
                      Add Details
                    </button>
                  </div>
                )}

                {/* Add Post Modal */}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="Add Post Modal"
                  className="absolute inset-0 flex items-center justify-center"
                  overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75"
                  closeTimeoutMS={200}
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
                    <textarea
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

                {/* Add Details Modal */}
                <Modal
                  isOpen={detailsModalIsOpen}
                  onRequestClose={closeDetailsModal}
                  contentLabel="Add Details Modal"
                  className="absolute inset-0 flex items-center justify-center"
                  overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75"
                  closeTimeoutMS={200}
                >
                  <div className="bg-white rounded-lg w-[400px] max-h-[90vh] overflow-y-auto p-6">
                    <h2 className="text-2xl font-bold mb-4">Add Details</h2>
                    <form onSubmit={handleDetailsSubmit}>
                      <div className="mb-4">
                        <label className="block text-gray-700">Age</label>
                        <input
                          type="number"
                          name="age"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Experience Years</label>
                        <input
                          type="number"
                          name="experienceYears"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                          type="text"
                          name="location"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                          type="text"
                          name="phone"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Specialised</label>
                        <input
                          type="text"
                          name="specialised"
                          className="w-full p-2 border rounded"
                          placeholder="Comma separated values"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">About Me</label>
                        <textarea
                          name="aboutMe"
                          className="w-full p-2 border rounded"
                        ></textarea>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={closeDetailsModal}
                          className="bg-red-500 text-white py-2 px-4 rounded"
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal>

                <h2 className="text-xl mt-6 mb-4">{painter?.aboutMe}</h2>

                <h2 className="text-xl font-bold mt-6 mb-4">My Works</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-2">
                  {painter?.posts?.length > 0 ? (
                    painter.posts.map((post, index) => (
                      <div key={index} className="relative">
                        <img
                          src={post.imageUrl}
                          className="w-full h-full rounded-md object-cover"
                          alt="Post"
                        />
                        <p>{post.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>No works posted yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default PainterProfile;

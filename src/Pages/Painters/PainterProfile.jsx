import React, { useState, useRef, useEffect } from "react";
import ClientNavbar from "../../Components/Clients/ClientNavbar";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import uploadImageToFirebase from "../../Services/firebaseconfig/imageUploader";
import axios from "../../Services/axiosService";
import {jwtDecode} from "jwt-decode";
import { PainterEndpoints } from "../../Services/endpoints/painter";
import ClientPost from "../../Components/Clients/ClientPosts";
import PainterNavbar from "../../Components/Painters/PainterNavbar";

function PainterProfile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [painter, setPainter] = useState(null);
  const [age, setAge] = useState('');
  const [experienceYears, setExperienceYears] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [specialised, setSpecialised] = useState(''); 
  const [aboutMe, setAboutMe] = useState(''); 
  const [posts, setPosts] = useState([]);

  const descriptionRef = useRef(null);
  const token = localStorage.getItem("Painter_token")


  if(token){
    const decode = jwtDecode(token.toString());
    var id = decode.username;
  }


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(PainterEndpoints.painterProfile(id));
        if (response.data) {
          setPainter(response.data.painter);
          setPosts(response.data.posts);
          setAge(response.data.painter.age);
          setExperienceYears(response.data.painter.experienceYears);
          setLocation(response.data.painter.location);
          setPhone(response.data.painter.phone);
          setSpecialised(response.data.painter.specialised.join(','));
          setAboutMe(response.data.painter.aboutMe);
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

        await axios.post(PainterEndpoints.Profile, { data });
        
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

    const details = {
      age,
      experienceYears,
      location,
      phone,
      specialised: specialised.split(","),
      aboutMe,
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


  const handleDelete = (id) => {
    try {
      const temp = [...posts]
      delete temp[id],
      setPosts(temp)
    } catch (error) {
      
    }
  }

  return (
    <>
      <div className="w-full fixed z-20">
        <PainterNavbar />
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
                      className="ml-4 border-transparent relative z-10 py-2 px-3 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-purple-900 to-teal-500"
                      onClick={openModal}
                    >
                      Add Post
                    </button>
                    <button
                      className="ml-4 border-transparent relative z-10 py-2 px-3 text-white font-bold text-lg rounded-[30px] cursor-pointer focus:outline-none bg-gradient-to-r from-lime-900 to-teal-500"
                      onClick={openDetailsModal}
                    >
                      Details
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
                        className="bg-red-600 text-white py-2 px-6 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>

                {/* Add Details Modal */}
                <Modal
                  isOpen={detailsModalIsOpen}
                  onRequestClose={closeDetailsModal}
                  contentLabel="Add/Edit Details Modal"
                  className="absolute inset-0 flex items-center justify-center"
                  overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75"
                  closeTimeoutMS={200}
                >
                  <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                    <h2 className="text-2xl font-bold mb-4">
                      {detailsModalIsOpen ? "Edit Details" : "Add Details"}
                    </h2>
                    <form onSubmit={handleDetailsSubmit}>
                      <label htmlFor="age">Age</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full"
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <label htmlFor="experienceYears">Experience Years</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full"
                        type="number"
                        id="experienceYears"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                      />
                      <label htmlFor="location">Location</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full"
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <label htmlFor="phone">Phone</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <label htmlFor="specialised">Specialised (comma separated)</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full"
                        type="text"
                        id="specialised"
                        value={specialised}
                        onChange={(e) => setSpecialised(e.target.value)}
                      />
                      <label htmlFor="aboutMe">About Me</label>
                      <textarea
                        className="border py-2 px-4 mb-4 w-full"
                        id="aboutMe"
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                      />
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="bg-slate-600 text-white py-2 px-6 rounded-lg mr-4"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={closeDetailsModal}
                          className="bg-red-600 text-white py-2 px-6 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal>

                {/* Render Posts */}
                {posts.map((post,index) => (

                  <div className="block rounded-xl bg-[#50187b67] m-5 h-100" key={post._id}>
                    <ClientPost onDelete={handleDelete} painterId={id} edit={true} id={index} post={post} indPostId={post._id} />
                  </div>
                
                ))}
                
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default PainterProfile;
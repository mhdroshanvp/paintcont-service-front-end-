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
import dummyImg from "../../assets/user-removebg.png"

function PainterProfile() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(dummyImg);
  const [description, setDescription] = useState("");
  const [painter, setPainter] = useState(null);
  const [age, setAge] = useState('');
  const [experienceYears, setExperienceYears] = useState(''); 
  const [location, setLocation] = useState(''); 
  const [phone, setPhone] = useState(''); 
  const [specialised, setSpecialised] = useState(''); 
  const [aboutMe, setAboutMe] = useState(''); 
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSpecialised, setSelectedSpecialised] = useState('');
  const [profilePic,setProfilePic] = useState('')

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
          setProfilePic(response.data.painter.profilePicture)
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
          specialised: selectedSpecialised 
        };
  
        await axios.post(PainterEndpoints.Profile, data );
        
        setDescription("");
        setSelectedSpecialised('');
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

    const profilePicture = selectedAvatar ? await uploadImageToFirebase(selectedAvatar, "profile_pictures/") : painter?.profilePicture;


    const details = {
      age,
      experienceYears,
      location,
      phone,
      specialised: specialised.split(","),
      aboutMe,
      profilePicture
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
      console.log(error);
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSpecialisedSelection = (speciality) => {
    setSelectedSpecialised(speciality);
    setIsOpen(false);
  };
  


  return (
    <>
      <div className="w-full fixed z-20">
        <PainterNavbar />
      </div>

      <div className="linear-gradient(to right, #200a31, #1f3752)">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="text-white bg-[#50187b67] shadow rounded-lg p-6  mt-7">
                <div className="flex flex-col items-center">
                  <img
                    src={profilePic || "/profileIcon.png"}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    alt="Profile"
                  />
                  <h1 className="text-xl font-bold">{painter?.username || "Painter Name"}</h1>
                  <p className="text-white">
                    {` ${painter?.experienceYears || "0"} years of experience`}
                  </p>
                  <p>{painter?.phone}</p>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-white uppercase font-bold tracking-wider mb-2">
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
            <div className="col-span-4 sm:col-span-9 ">
              <div className="bg-[#17021e] shadow rounded-lg p-6 mt-7">
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

                {/* Add Post Modal */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Add Post Modal"
  className="absolute inset-0 flex items-center justify-center"
  overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-75"
  closeTimeoutMS={200}
>
  <div className="bg-[#50187b] rounded-lg p-8 max-w-lg w-full">
    <h2 className="text-2xl font-bold mb-4 text-white">Add Post</h2>
    {/* File upload */}
    <input
      type="file"
      className="py-2 px-4 text-white bg-purple-800 rounded-full mb-4"
      accept="image/*"
      onChange={(e) => handleAvatarChange(e.target.files)}
    />
    {/* Preview */}
    <div className="w-40 h-40 mb-4">
      <img
        src={previewAvatar}
        alt="Profile Pic"
        className="w-full h-full rounded-full object-cover"
      />
    </div>
    {/* Description */}
    <textarea
      className="border py-2 px-4 mb-4 w-full bg-purple-800"
      placeholder="Type post description"
      type="text"
      name="description"
      id="description"
      ref={descriptionRef}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    {/* Specialised dropdown */}

  <div className="relative inline-block text-left w-full">
    <div>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={toggleDropdown}
      >
        {/* Display selected specialized category or "Specialised" */}
        {selectedSpecialised ? selectedSpecialised : 'SPECIALISED'}
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    {isOpen && (
      <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
        <div className="py-1" role="none">
          {painter?.specialised.map((speciality, index) => (
            <div key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer "onClick={() => handleSpecialisedSelection(speciality)} >
              {speciality}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
    {/* Save and Cancel buttons */}
    <div className="flex justify-between pt-5">
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
                  className=""
                  overlayClassName="fixed inset-0  "
                  closeTimeoutMS={200}
                >
                  <div className="bg-[#50187b] mt-5  rounded-lg p-9  w-full">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                      {detailsModalIsOpen ? "Edit Details" : "Add Details"}
                    </h2>
                    <form onSubmit={handleDetailsSubmit}>


                    <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePicture">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleAvatarChange(e.target.files)}
                                    className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e5398d] file:text-white hover:file:bg-[#1f3752]"
                                />
                                {previewAvatar && (
                                    <img
                                        src={previewAvatar}
                                        alt="Selected Avatar"
                                        className="w-32 h-32 bg-gray-300 rounded-full mb-4 mt-4"
                                    />
                                )}
                    </div>


                      <label htmlFor="age" className="text-white">Age</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full bg-purple-800 text-white"
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <label htmlFor="experienceYears" className="text-white">Experience Years</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full bg-purple-800 text-white"
                        type="number"
                        id="experienceYears"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(e.target.value)}
                      />
                      <label htmlFor="location" className="text-white">Location</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full bg-purple-800 text-white"
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <label htmlFor="phone" className="text-white">Phone</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full bg-purple-800 text-white"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <label htmlFor="specialised" className="text-white">Specialised (comma separated)</label>
                      <input
                        className="border py-2 px-4 mb-4 w-full bg-purple-800 text-white"
                        type="text"
                        id="specialised"
                        value={specialised}
                        onChange={(e) => setSpecialised(e.target.value)}
                      />
                      <label htmlFor="aboutMe" className="text-white">About Me</label>
                      <textarea
                        className="border py-2 px-4 mb-4 w-full bg-purple-800 text-white"
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
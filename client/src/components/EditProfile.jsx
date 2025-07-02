import React, { useState } from "react";
import ProfileView from "./ProfileView";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../store/features/userSlice";
import toast, { Toaster } from "react-hot-toast";
// import { configureStore } from "@reduxjs/toolkit";

const UpdateToast = () => toast.success("Profile updated successfully");
const ErrorToast = () => toast.error("Error");

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [email, setEmail] = useState(user.email);
  // const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  const handleUpadteProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          about,
          gender,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        UpdateToast();
      }
      // if(res.status === 400){
      //   setErrorMsg
      // }

      dispatch(addUser(res.data));
    } catch (err) {
      // setErrorMsg(err.response.data);
      ErrorToast(err.response.data);
      console.log("Error updating profile:", err.response.data);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex justify-center  items-center gap-10">
        <div className="flex flex-col shadow-md rounded-md p-5 gap-2 bg-slate-200 m-10">
          <h1 className="text-center font-semibold text-xl">Upadte Profile</h1>
          <input
            className="border rounded-md h-10 p-2 w-96 border-black"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="border rounded-md h-10 p-2 w-96  border-black"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="border rounded-md h-10 p-2 w-96 border-black"
            type="text"
            placeholder="Email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded-md h-10 p-2 w-96 border-black"
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <input
            className="border rounded-md h-10 p-2 w-96 border-black"
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            className="border h-10 rounded-md p-2 w-96  border-black"
            type="text"
            placeholder="About"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            className="border h-10 rounded-md p-2 w-96  border-black"
            type="text"
            placeholder="Photo Url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <button
            className="bg-blue-500 rounded-md p-2 font-semibold text-white hover:bg-blue-600"
            onClick={handleUpadteProfile}
          >
            Update profile
          </button>
        </div>
        <div className="">
          <ProfileView
            user={{ firstName, lastName, age, about, gender, photoUrl }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

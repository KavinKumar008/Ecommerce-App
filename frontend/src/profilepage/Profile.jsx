import React from "react";
import { useUserProfile } from "../UserProfileProvider";
import NavBar from "../navbar/NavBar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { profileData, setProfileData } = useUserProfile();
  const navigate = useNavigate();

  console.log(profileData, "profiledataaaat");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("googleToken");
    setProfileData(null);
    navigate("/");
  };

  const handleNavigateAddNew = () => {
    navigate("/addnewproduct");
  };

  if (!profileData) {
    return (
      <>
        <NavBar />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-600 text-lg">
            Please login to view your profile.
          </p>
        </div>
      </>
    );
  }

  const { name, email, _id, picture } = profileData;

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen lg:h-[500px] bg-gray-100  xl:h-screen lg:h-screen md:h-screen sm:h-screen">
        <div className="flex flex-col justify-between xl:w-[450px] xl:h-[400px] md:w-[400px] md:h-[350px] w-[330px] h-[400px] bg-white rounded-md shadow-md xl:mt-10">
          <p className="text-center p-3 mt-6 font-bold text-2xl underline">
            Your Profile Information
          </p>
          <div className="flex flex-col items-center gap-3">
            <img
              src={
                picture ||
                `https://ui-avatars.com/api/?name=${name}&background=random`
              }
              alt="Profile"
              className="rounded-full w-24 h-24 mt-3"
            />
            <div className="flex">
              <p className="font-semibold text-md">Your name :</p>
              <p className="text-amber-600 ml-2">{name || "Not Provided"}</p>
            </div>
            <div className="flex">
              <p className="font-semibold text-md">Your email :</p>
              <p className="text-amber-600 ml-2">{email}</p>
            </div>
            <div className="flex">
              <p className="font-semibold text-md">Your ID :</p>
              <p className="text-amber-600 ml-2">{_id}</p>
            </div>
          </div>

          <div className="flex justify-end items-end p-5">
            {/* <button className="cursor-pointer" onClick={handleNavigateAddNew}>
              Add New Product
            </button> */}
            <button
              onClick={handleLogout}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

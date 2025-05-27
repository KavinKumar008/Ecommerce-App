import React from "react";
import { useUserProfile } from "../UserProfileProvider";
import NavBar from "../navbar/NavBar";

const Profile = () => {
  const { authDetails, signUpDetails } = useUserProfile();
  console.log(authDetails, "skdhskdjhs", signUpDetails);
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen lg:h-[500px] bg-gray-100">
        <div className="flex flex-col justify-between xl:w-[450px] xl:h-[400px] md:w-[400px] md:h-[350px] w-[330px] h-[400px] bg-white rounded-md shadow-md">
          <p className="text-center p-3 mt-6 font-bold text-2xl underline">
            Your Profile Information
          </p>
          {authDetails && (
            <div className="flex flex-col items-center gap-3">
              <img src={authDetails.picture} alt="Profile Image" />
              <p className="font-semibold text-md">Your name :</p>
              <p className="text-amber-600">{authDetails.name}</p>
              <p className="font-semibold text-md">Your email :</p>
              <p className="text-amber-600">{authDetails.email}</p>
              {/* <p>Created Time :</p>
            <p>{authDetails.createdAt}</p> */}
            </div>
          )}
          {signUpDetails && (
            <div className="flex flex-col p-5 justify-center gap-3">
              <div className="flex">
                <p className="font-semibold text-md">Your Email :</p>
                <p className="text-amber-600">
                  {signUpDetails.email || signUpDetails.mobile}
                </p>
              </div>
              <div className="flex">
                <p className="font-semibold text-md">Your Password :</p>
                <p className="text-amber-600">{signUpDetails.password}</p>
              </div>
            </div>
          )}
          <p className="flex justify-end items-end mr-10 p-2 cursor-pointer">
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;

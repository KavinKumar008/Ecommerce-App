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
        <div className="w-[300px] h-[230px] bg-blue-200 rounded-md">
          <p className="text-center p-3 font-bold text-xl">
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
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="font-semibold text-md">Your Email :</p>
              <p className="text-amber-600">
                {signUpDetails.email || signUpDetails.mobile}
              </p>
              <p className="font-semibold text-md">Your Password :</p>
              <p className="text-amber-600">{signUpDetails.password}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;

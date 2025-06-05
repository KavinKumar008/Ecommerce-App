import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";
import { useUserProfile } from "../UserProfileProvider";

const SignUp = () => {
  const {
    userInput,
    setUserInput,
    userPass,
    setUserPass,
    errors,
    setErrors,
    validate,
    handleSuccess,
    handleSubmit,
  } = useUserProfile();
  // const [userInput, setUserInput] = useState("");
  // const [userPass, setUserPass] = useState("");
  const [eye, setEye] = useState(false);
  // const [errors, setErrors] = useState({ userInput: "", userPass: "" });
  const navigate = useNavigate();
  // const baseurl = import.meta.env.VITE_API_URL;

  const handleUserInput = (e) => {
    setUserInput(e);
    console.log(userInput);
  };

  const handlePass = (e) => {
    setUserPass(e);
  };

  const toggleEye = () => {
    setEye((prev) => !prev);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setUserInput("");
    setUserPass("");
    setErrors({ userInput: "", userPass: "" });
  };

  // const validate = () => {
  //   let valid = true;
  //   const newErrors = { userInput: "", userPass: "" };

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const mobileRegex = /^[6-9]\d{9}$/;
  //   if (!userInput.trim()) {
  //     newErrors.userInput = "Email or Mobile Number is required";
  //     valid = false;
  //   } else if (!emailRegex.test(userInput) && !mobileRegex.test(userInput)) {
  //     newErrors.userInput = "Invalid Email or Mobile Format";
  //     valid = false;
  //   }

  //   if (!userPass.trim()) {
  //     newErrors.userPass = "Password is required";
  //     valid = false;
  //   } else if (userPass.length < 6) {
  //     newErrors.userPass = "Password must be contain atleast 6 characters";
  //     valid = false;
  //   }

  //   setErrors(newErrors);
  //   return valid;
  // };
  // const login = useGoogleLogin({
  //   onSuccess: (res) => console.log(res),
  //   onError: (err) => console.log(err),
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     console.log("form submitted : ", userInput, userPass);
  //     navigate("/products");
  //   }
  // };

  // const handleSuccess = async (credentialRes) => {
  //   try {
  //     const res = await axios.post(`${baseurl}/auth/google`, {
  //       credential: credentialRes.credential,
  //     });

  //     console.log(res);

  //     localStorage.setItem("user", JSON.stringify(res.data.user));
  //   } catch (error) {
  //     console.log("Error during login :", error);
  //   }
  // };

  return (
    <main className="flex justify-center items-center h-screen">
      <section className="xl:w-[500px] xl:h-[530px] w-[450px] h-[530px] rounded-xl shadow-2xl">
        <section>
          <div>
            <h1 className="text-center text-3xl font-bold mt-5 underline">
              Welcome To My App
            </h1>
          </div>
          <form onSubmit={(e) => handleSubmit(e, navigate)}>
            <div className="p-4 mt-5 flex flex-col gap-4">
              <label>
                <p className="font-bold text-lg">Email or Mobile No</p>
                <input
                  type="text"
                  placeholder="enter email or mobile no"
                  className="w-full p-3 border border-gray-200 rounded-md outline-0"
                  value={userInput || ""}
                  onChange={(e) => handleUserInput(e.target.value)}
                />
                {errors.userInput && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.userInput}
                  </p>
                )}
              </label>
              <label>
                <p className="font-bold text-lg">Password</p>
                <div className="relative">
                  <input
                    type={eye ? "text" : "password"}
                    placeholder="enter password"
                    className="w-full p-3 border border-gray-200 rounded-md outline-0"
                    value={userPass || ""}
                    onChange={(e) => handlePass(e.target.value)}
                  />
                  {eye ? (
                    <IoIosEye
                      className="absolute right-3 bottom-4 text-xl cursor-pointer"
                      onClick={toggleEye}
                    />
                  ) : (
                    <IoIosEyeOff
                      className="absolute right-3 bottom-4 text-xl cursor-pointer"
                      onClick={toggleEye}
                    />
                  )}
                </div>
                {errors.userPass && (
                  <p className="text-sm text-red-500 mt-2">{errors.userPass}</p>
                )}
              </label>
              <label className="flex gap-3 items-center">
                <input type="checkbox" />
                <p>Remember Me</p>
              </label>
            </div>
            <div className="flex justify-around p-2">
              <button
                className="outline-0 bg-blue-400 p-3 w-[150px] rounded-md text-white font-bold cursor-pointer text-xl hover:bg-red-500"
                onClick={(e) => handleCancel(e)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="outline-0 bg-blue-400 p-3 w-[150px] rounded-md text-white font-bold cursor-pointer text-xl"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex justify-center">
            <p className="text-xl font-bold">or</p>
          </div>
          <div className="flex justify-center items-center mt-2">
            {/* <button
              className="flex items-center gap-10 boder-2 border-black bg-green-100 p-3 w-[300px] rounded-md cursor-pointer"
              onClick={() => login()}
            >
              <FaGoogle />
              Sign in with Google
            </button> */}
            <GoogleLogin
              onSuccess={(cred) => handleSuccess(cred, navigate)}
              onError={(err) => console.log(err)}
            />
          </div>
        </section>
      </section>
      {/* <div>
        {users.map((user, i) => (
          <div key={i}>
            <p>{user.description}</p>
            <img src={user.image} alt="" />
            <span>{user.price}</span>
          </div>
        ))}
      </div> */}
    </main>
  );
};

export default SignUp;

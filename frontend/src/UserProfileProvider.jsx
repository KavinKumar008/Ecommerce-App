import { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export const UserProfileProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errors, setErrors] = useState({ userInput: "", userPass: "" });
  const baseurl = import.meta.env.VITE_API_URL;
  const [authDetails, setAuthDetails] = useState("");
  const [signUpDetails, setSignUpDetails] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const validate = () => {
    let valid = true;
    const newErrors = { userInput: "", userPass: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!userInput.trim()) {
      newErrors.userInput = "Email or Mobile Number is required";
      valid = false;
    } else if (!emailRegex.test(userInput) && !mobileRegex.test(userInput)) {
      newErrors.userInput = "Invalid Email or Mobile Format";
      valid = false;
    }

    if (!userPass.trim()) {
      newErrors.userPass = "Password is required";
      valid = false;
    } else if (userPass.length < 6) {
      newErrors.userPass = "Password must be contain atleast 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSuccess = async (credentialRes, navigate) => {
    try {
      const res = await axios.post(`${baseurl}/auth/google`, {
        credential: credentialRes.credential,
      });

      console.log(res);
      if (res.status === 200) {
        setAuthDetails(res.data.user);
        navigate("/products");
        // setIsLoggedIn(true);
      }
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.log("Error during login :", error);
    }
  };

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();

    if (!validate()) return;
    try {
      const signupRes = await axios.post(`${baseurl}/signup-Details`, {
        userInput,
        userPass,
      });
      console.log(signupRes);
      if (signupRes.status === 200) {
        setSignUpDetails(signupRes.data.data);
        // setIsLoggedIn(true);
        navigate("/products");
      }
      setUserInput("");
      setUserPass("");
    } catch (error) {
      console.log("Error posting signup datas :", error);
    }
  };

  console.log(authDetails);
  return (
    <UserContext.Provider
      value={{
        userInput,
        setUserInput,
        userPass,
        setUserPass,
        errors,
        setErrors,
        validate,
        handleSuccess,
        authDetails,
        handleSubmit,
        signUpDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserProfile = () => useContext(UserContext);

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import OtpPage from "../../components/otp/OtpPage";
import IndexNav from "../../components/IndexNav";
import {
  isEmpty,
  isEmailValid,
  isPasswordValid,
  passwordcheck,
} from "../../../helper/validation";
import { googleSignup, signup } from "../../redux/actions/userAction";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpPage, setOtpPage] = useState(false);
  const [datas, setDatas] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    passwordErr: false,
    confirmPasswordErr: false,
  });

  const [errMessages, setErrMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(
        (prevShowConfirmPassword) => !prevShowConfirmPassword
      );
    }
  };

  const handleChange = (event) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const errors = {
      firstNameErr: false,
      lastNameErr: false,
      emailErr: false,
      passwordErr: false,
      confirmPasswordErr: false,
    };

    const errMessages = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let valid = true;

    if (isEmpty(userCredentials.firstName)) {
      errMessages.firstName = "First name can't be empty";
      errors.firstNameErr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.lastName)) {
      errMessages.lastName = "Last name can't be empty";
      errors.lastNameErr = true;
      valid = false;
    }
    if (isEmailValid(userCredentials.email)) {
      errMessages.email = "Enter a valid email";
      errors.emailErr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.email)) {
      errMessages.email = "Email can't be empty";
      errors.emailErr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.password)) {
      errMessages.password = "Password can't be empty";
      errors.passwordErr = true;
      valid = false;
    } else if (isPasswordValid(userCredentials.password)) {
      errMessages.password = "Password is too weak";
      errors.passwordErr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.confirmPassword)) {
      errMessages.confirmPassword = "Confirm password can't be empty";
      errors.confirmPasswordErr = true;
      valid = false;
    } else if (
      passwordcheck(userCredentials.password, userCredentials.confirmPassword)
    ) {
      errMessages.confirmPassword = "Passwords don't match";
      errors.confirmPasswordErr = true;
      valid = false;
    }

    setError(errors);
    setErrMessages(errMessages);

    if (valid) {
      console.log("Form submitted successfully", userCredentials);
      try {
        console.log("user credential Data......:", userCredentials);
        const { confirmPassword, ...userDetails } = userCredentials;
        // console.log("user details Data......:",userDetails);
        const result = await dispatch(signup(userDetails));
        console.log("user event Data:",result);

        if (result.meta.requestStatus === "fulfilled") {
          if (result.payload.success) {
            // console.log("user event Data:::::::::::::::::::::::",result.meta.arg);
            setDatas(result.meta.arg);
            toast.success("Otp send successfully..");
            setOtpPage(true);
          } else {
            toast.error(result.payload.message);
            navigate('/login')
          }
        } else if (result.meta.requestStatus === "rejected") {
          toast.error(result.payload?.response.data.error || "SignUp failed!");
        }
      } catch (error) {
        console.log(error);
        toast.error("signup failed");
      }
    }
  };

  const signupDispatch = async (otp) => {
    console.log("Inside of signup dispatch datas:", userCredentials);
    console.log("Inside of OTP.......:", otp);
    if (otp) {
      userCredentials.otp = otp;
    }
    console.log("User credentials Data for signup :", userCredentials);
    return await dispatch(signup(userCredentials));
  };

  const handleGoogleLoginSuccess = async (data) => {
    console.log("Google auth data for signup time:", data);
    const googleLoginData = await dispatch(googleSignup(data));
    console.log("googleLoginData.......", googleLoginData);
    toast.success("Login successful");
    navigate("/");
  };

  return (
    <>
      <IndexNav />
      <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-gray-500 to-white justify-center items-center">
          <img
            src="https://res.cloudinary.com/dwhu3u4st/image/upload/v1728444924/LoginTheam/zt9pxa2hijod4qtoomls.png"
            alt="Sample image"
            className="max-w-lg h-auto"
          />
        </div>

        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 py-12 bg-white">
          <div className="mx-auto w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Join Us Today
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Create your account to get started
            </p>

            <div className="mt-8">
              {otpPage ? (
                <OtpPage
                  email={userCredentials.email}
                  signupDispatch={signupDispatch}
                />
              ) : (
                <form className="space-y-6" onSubmit={handleSignUp}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        placeholder=""
                        value={userCredentials.firstName}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="firstName"
                        className={`absolute left-4 top-3 text-gray-600 transition-all pointer-events-none ${
                          userCredentials.firstName ? "hidden" : ""
                        }`}
                      >
                        First Name
                      </label>
                      {error.firstNameErr && (
                        <p className="mt-1 text-sm text-red-500">
                          {errMessages.firstName}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
                        placeholder=" "
                        value={userCredentials.lastName}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="lastName"
                        className={`absolute left-4 top-3 text-gray-600 transition-all pointer-events-none ${
                          userCredentials.lastName ? "hidden" : ""
                        }`}
                      >
                        Last Name
                      </label>
                      {error.lastNameErr && (
                        <p className="mt-1 text-sm text-red-500">
                          {errMessages.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
                      placeholder=" "
                      value={userCredentials.email}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-4 top-3 text-gray-600 transition-all pointer-events-none ${
                        userCredentials.email ? "hidden" : ""
                      }`}
                    >
                      Email Address
                    </label>
                    {error.emailErr && (
                      <p className="mt-1 text-sm text-red-500">
                        {errMessages.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
                      placeholder=" "
                      value={userCredentials.password}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="password"
                      className={`absolute left-4 top-3 text-gray-600 transition-all pointer-events-none ${
                        userCredentials.password ? "hidden" : ""
                      }`}
                    >
                      Password
                    </label>
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password")}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.936.536-3.74 1.494-5.175m2.145 1.775A8.96 8.96 0 0012 9c2.071 0 3.962.635 5.425 1.775M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {error.passwordErr && (
                      <p className="mt-1 text-sm text-red-500">
                        {errMessages.password}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
                      className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 "
                      placeholder=" "
                      value={userCredentials.confirmPassword}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="confirmPassword"
                      className={`absolute left-4 top-3 text-gray-600 transition-all pointer-events-none ${
                        userCredentials.confirmPassword ? "hidden" : ""
                      }`}
                    >
                      Confirm Password
                    </label>
                    <div className="absolute inset-y-0 right-4 flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.936.536-3.74 1.494-5.175m2.145 1.775A8.96 8.96 0 0012 9c2.071 0 3.962.635 5.425 1.775M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {error.confirmPasswordErr && (
                      <p className="mt-1 text-sm text-red-500">
                        {errMessages.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500">Or continue with</span>
                    <hr className="flex-grow border-t border-gray-300" />
                  </div>

                  <div className="flex justify-center">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        const data = jwtDecode(credentialResponse?.credential);
                        handleGoogleLoginSuccess(data);
                      }}
                      onError={() => {
                        console.log("Login Failed");
                        toast.error("Google login failed");
                      }}
                      theme="filled_black"
                      shape="circle"
                    />
                  </div>

                  <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Log in
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

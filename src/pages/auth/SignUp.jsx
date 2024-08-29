import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  isEmpty,
  isEmailValid,
  isPasswordValid,
  passwordcheck,
} from "../../../helper/validation";
import { googleSignup, signup } from "../../redux/actions/userAction";
import toast from "react-hot-toast";
import OtpPage from "../../components/otp/OtpPage";
import { useNavigate} from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

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
        // console.log("user event Data:",result);

        if (result.meta.requestStatus === "fulfilled") {
          if (result.payload.success) {
            // console.log("user event Data:::::::::::::::::::::::",result.meta.arg);
            setDatas(result.meta.arg);
            toast.success("Otp send successfully..");
            setOtpPage(true);
          } else {
            toast.error("Signup failed");
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
    console.log("User credentials Data for signup :",userCredentials);
    return await dispatch(signup(userCredentials))
  };

  const handleGoogleLoginSuccess = async (data) => {
    console.log("Google auth data for signup time:", data);
    const googleLoginData= await dispatch(googleSignup(data));
    console.log("googleLoginData.......",googleLoginData);
    toast.success("Login successful");
    navigate("/");
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-br from-gray-100 to-gray-500">
      <div className="flex-1 flex items-center justify-center">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
          className="max-w-full h-auto"
        />
      </div>
      {otpPage ? (
        <OtpPage
          email={userCredentials.email}
          signupDispatch={signupDispatch}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <div className="text-center mb-3">
              <h2 className="text-4xl font-bold">Sign Up</h2>
            </div>
            <form className="space-y-2" onSubmit={handleSignUp}>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  First Name:
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your first name"
                  name="firstName"
                  autoComplete="given-name"
                />
                {error.firstNameErr && (
                  <div className="text-red-500">{errMessages.firstName}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Last Name:
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your last name"
                  name="lastName"
                  autoComplete="family-name"
                />
                {error.lastNameErr && (
                  <div className="text-red-500">{errMessages.lastName}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email:
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your email"
                  name="email"
                  autoComplete="email"
                />
                {error.emailErr && (
                  <div className="text-red-500">{errMessages.email}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter your password"
                  name="password"
                  autoComplete="new-password"
                />
                {error.passwordErr && (
                  <div className="text-red-500">{errMessages.password}</div>
                )}
                <button
                  type="button"
                  className="absolute right-3 bottom-2"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-600">
                  Confirm Password:
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={handleChange}
                  className="mt-1 p-1 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  autoComplete="new-password"
                />
                {error.confirmPasswordErr && (
                  <div className="text-red-500">
                    {errMessages.confirmPassword}
                  </div>
                )}
                <button
                  type="button"
                  className="absolute right-3 bottom-2"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 mt-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Sign Up
                </button>
                <p className="text-gray-600 mt-2">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Login
                  </a>
                </p>
                <div className="flex justify-center">
              <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const data = jwtDecode(credentialResponse?.credential);
                    console.log('google auth data',data);
                    handleGoogleLoginSuccess(data);
                  }}
                  onError={() => {
                    console.log('login Failed');
                  }}
                />
              </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUp;

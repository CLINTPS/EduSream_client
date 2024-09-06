import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import {jwtDecode} from "jwt-decode";
import { isEmpty, isEmailValid } from "../../../helper/validation";
import { googleSignup, login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailerr: false,
    passworderr: false,
  });

  const [errdefin, seterrdefin] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (eve) => {
    setUserCredentials({
      ...userCredentials,
      [eve.target.name]: eve.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {
      emailerr: false,
      passworderr: false,
    };

    const errmessage = {
      email: "",
      password: "",
    };

    let valid = true;

    if (isEmailValid(userCredentials.email)) {
      errmessage.email = "Enter a valid email";
      errors.emailerr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.email)) {
      errmessage.email = "Email can't be empty";
      errors.emailerr = true;
      valid = false;
    }
    if (isEmpty(userCredentials.password)) {
      errmessage.password = "Password can't be empty";
      errors.passworderr = true;
      valid = false;
    }
    setError(errors);
    seterrdefin(errmessage);

    try {
      console.log("Form submitted successfully", userCredentials);
      const loginData = await dispatch(login(userCredentials));
      console.log("User login Data :::::", loginData);

      if (loginData.meta.requestStatus === "fulfilled") {
        console.log("Login successful");
        toast.success("Login successful");
        navigate("/");
      } else if (loginData.payload) {
        const rawPayload = loginData.payload;
        const backendMessage = rawPayload.match(/Error: (.*?)<br>/)?.[1];

        if (backendMessage) {
          toast.error(backendMessage);
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      toast.error("Unexpected error occurred");
    }
  };

  const handleGoogleLoginSuccess = async (data) => {
    try {
      console.log("Google auth data for signup time:", data);
      const googleLoginData = await dispatch(googleSignup(data));
      console.log("googleLoginData.......", googleLoginData);
  
      if (
        googleLoginData.meta.requestStatus === "fulfilled" &&
        !googleLoginData.payload?.isAxiosError
      ) {
        toast.success("Login successful");
        navigate("/");
      } else if (googleLoginData.payload?.isAxiosError) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        const backendMessage = googleLoginData.payload?.message.match(/Error: (.*?)<br>/)?.[1];
        if (backendMessage) {
          toast.error(backendMessage);
        } else {
          toast.error("Login failed");
        }
      }
    } catch (error) {
      console.error("Unexpected error during Google login:", error);
      toast.error("Unexpected error occurred");
    }
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
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <div className="text-center mb-3">
            <h2 className="text-4xl font-bold">Login</h2>
          </div>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                type="email"
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                name="email"
                autoComplete="email"
              />
              {error.emailerr && (
                <div className="text-red-500">{errdefin.email}</div>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-600">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                name="password"
                autoComplete="new-password"
              />
              {error.passworderr && (
                <div className="text-red-500 ">{errdefin.password}</div>
              )}
              <button
                type="button"
                className="absolute right-3 bottom-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </button>
              <p className="text-gray-600 mt-4">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Sign Up
                </a>
              </p>
              <p className="text-gray-600 mb-4 mt-3">Or sign up with</p>
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
    </section>
  );
};

export default Login;

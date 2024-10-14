import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { isEmpty, isEmailValid } from "../../../helper/validation";
import { googleSignup, login } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import IndexNav from "../../components/IndexNav";

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
      toast.error("Invalid password or email");
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
        toast.error(
          "Network error. Please check your connection and try again."
        );
      } else {
        const backendMessage =
          googleLoginData.payload?.message.match(/Error: (.*?)<br>/)?.[1];
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
              Login
            </h2>
            <p className="mt-2 text-center text-gray-600">
              Open your account to get started
            </p>

            <form className="space-y-6 mt-10" onSubmit={handleLogin}>
              <div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="block w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
                {/* <label className=" left-4 top-3 text-gray-600 transition-all pointer-events-none">
                
              </label> */}
                {error.emailerr && (
                  <div className="text-red-500">{errdefin.email}</div>
                )}
              </div>

              <div className="relative">
                {/* <label className=" block text-sm font-medium text-gray-600">
                
              </label> */}
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                  Login
                </button>
                <div className="flex items-center my-6">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500">Or continue with</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                <p className="text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Sign Up
                  </a>
                </p>
                <p className="text-gray-600 mt-4">
                  Or ?{" "}
                  <a
                    href="/forgot-password"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Forgot Password
                  </a>
                </p>
                <div className="flex mt-4 justify-center">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const data = jwtDecode(credentialResponse?.credential);
                      // console.log('google auth data',data);
                      handleGoogleLoginSuccess(data);
                    }}
                    onError={() => {
                      console.log("login Failed");
                      toast.error("Google login failed");
                    }}
                    theme="filled_black"
                    shape="circle"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

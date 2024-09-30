import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "../../../helper/validation";
import { forgotPassword } from "../../redux/actions/userAction";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import OtpPage from "../../components/otp/OtpPage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
    if (error) setError(""); 
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    
    if (isEmpty(email)) {
      setError("Email can't be empty");
      return;
    }
    
    try {
      const result = await dispatch(forgotPassword({ email }));
      if (result.meta.requestStatus === "fulfilled") {
        if (result.payload.success) {
          toast.success("OTP sent successfully. Check your email!");
          setOtpPage(true);
        } else {
          toast.error("Failed to send OTP.");
        }
      } else if (result.meta.requestStatus === "rejected") {
        toast.error(result.payload?.response?.data?.error || "Failed to send OTP!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP.");
    }
  };

  const handleOtpVerification = async (otp) => {
    console.log("OTP entered:", otp);
    navigate("/reset-password");
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
          {otpPage ? (
            <OtpPage email={email} verifyOtp={handleOtpVerification} />
          ) : (
            <>
              <div className="text-center mb-3">
                <h2 className="text-4xl font-bold">Forgot Password</h2>
              </div>
              <form className="space-y-4" onSubmit={handleForgotPassword}>
                <div>
                  <label className="block text-sm font-medium text-gray-600 text-center">
                    We’ll email you a link or OTP so you can reset your password.
                  </label>
                  <input
                    type="email"
                    onChange={handleChange}
                    className="mt-5 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter your email"
                    value={email}
                    name="email"
                    autoComplete="email"
                  />
                  {error && (
                    <div className="text-red-500 text-center mt-2">{error}</div>
                  )}
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Reset Password
                  </button>
                  <p className="text-gray-600 mt-2">
                    Or ?{" "}
                    <a
                      href="/login"
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;

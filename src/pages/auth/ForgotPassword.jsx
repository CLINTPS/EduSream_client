import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isEmpty } from "../../../helper/validation";
import { forgotPassword } from "../../redux/actions/userAction";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import OtpPage from "../../components/otp/OtpPage";
import IndexNav from "../../components/IndexNav";

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
        toast.error(
          result.payload?.response?.data?.error || "Failed to send OTP!"
        );
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

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-white">
            {otpPage ? (
              <OtpPage email={email} verifyOtp={handleOtpVerification} />
            ) : (
              <>
                <div className="text-center mb-3">
                  <h2 className="text-3xl font-bold text-gray-800 text-center">
                    Forgot Password
                  </h2>
                </div>
                <p className="mt-2 text-center text-gray-600">
                  We’ll email you a link or OTP so you can reset your password.
                </p>
                <form
                  className="space-y-6 mt-10"
                  onSubmit={handleForgotPassword}
                >
                  <div>
                    <input
                      type="email"
                      onChange={handleChange}
                      className="block w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      placeholder="Enter your email"
                      value={email}
                      name="email"
                      autoComplete="email"
                    />
                    {error && (
                      <div className="text-red-500 text-center mt-2">
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                    >
                      Reset Password
                    </button>
                    <div className="flex items-center my-6">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-4 text-gray-500">Or continue with</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                    <p className="text-gray-600 mt-2">
                    Already have an account? {" "}
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
      </div>
    </>
  );
};

export default ForgotPassword;

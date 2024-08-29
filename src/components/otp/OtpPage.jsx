import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"; 

const OtpPage = ({ email, signupDispatch }) => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const inputRefs = useRef([...Array(4)].map(() => React.createRef()));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(false);
  const navigate = useNavigate();

  const handleOTPChange = (index, value) => {
    if (!isNaN(value) && value !== '') {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      
      // Log the OTP entered so far
      console.log("OTP so far:", newOTP.join(''));

      if (index < 3) {
        inputRefs.current[index + 1].current.focus();
      }
    } else if (value.length === 0 && index > 0) {
      const newOTP = [...otp];
      newOTP[index] = '';
      setOTP(newOTP);
      inputRefs.current[index - 1].current.focus();
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (pastedData.length === 4) {
      const newOTP = pastedData.split('');
      setOTP(newOTP);
      inputRefs.current[3].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpNumber = otp.join('');
    
    console.log("Final OTP submitted:", otpNumber);

    if (otpNumber.length < 4) {
      setError('OTP not valid');
      toast.error('Please enter a valid OTP');
      return;
    }
    setLoading(true);
    try {
      const res = await signupDispatch(otpNumber);
      if (res.payload.success) {
        toast.success('Signup success');
        navigate('/login');
      } else {
        toast.error('Invalid OTP');
        setLoading(false);
      }
    } catch (error) {
      toast.error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <div className="flex justify-center items-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              ref={inputRefs.current[index]}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
        {timer > 0 ? (
          <p className="text-gray-600 mt-2">Resend OTP in {timer} seconds</p>
        ) : (
          <button
            className="text-blue-500 hover:underline focus:outline-none mt-2"
          >
            Resend OTP
          </button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default OtpPage;

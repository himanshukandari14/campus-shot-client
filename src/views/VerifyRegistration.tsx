// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyRegistrationOTP } from '@/redux/slices/authSlice';

const VerifyRegistration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('himanshu.kandari@eatoes.com');
    const [otp, setOtp] = useState(Array(6).fill('')); // Array to hold OTP digits
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Get only the last character
        setOtp(newOtp);

        // Move to the next input if there is a value
        if (value && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }

        // If the input is empty, focus on the previous input
        if (!value && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const otpString = otp.join('');

        if (otpString.length !== 6) {
            setError('OTP must be exactly 6 digits');
            setLoading(false);
            return;
        }

        try {
            const resultAction = await dispatch(verifyRegistrationOTP({ email, otp: otpString }));
            if (verifyRegistrationOTP.fulfilled.match(resultAction)) {
                navigate('/'); // Navigate on successful verification
            } else {
                setError(resultAction.payload || 'Verification failed');
            }
        } catch {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Verify Your Registration</h1>
            <p className="text-gray-600 mb-4">Please enter the OTP sent to your email.</p>
            <input 
                type="email" 
                placeholder="Email" 
                className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <div className="flex items-center mb-4">
                {/* First Group of OTP Inputs */}
                <div className="flex justify-between mr-2">
                    {otp.slice(0, 3).map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`} // Unique ID for each input
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center border border-blue-400 rounded-md"
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            onFocus={(e) => e.target.select()} // Select input value on focus
                        />
                    ))}
                </div>
                <div className="border-t-2 border-gray-300 w-8 mx-2"></div> {/* Horizontal Line */}
                {/* Second Group of OTP Inputs */}
                <div className="flex justify-between">
                    {otp.slice(3).map((digit, index) => (
                        <input
                            key={index + 3}
                            id={`otp-input-${index + 3}`} // Unique ID for each input
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center border border-blue-400 rounded-md"
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target.value, index + 3)}
                            onFocus={(e) => e.target.select()} // Select input value on focus
                        />
                    ))}
                </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button 
                onClick={handleSubmit} 
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200" 
                disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
        </div>
    );
};

export default VerifyRegistration;

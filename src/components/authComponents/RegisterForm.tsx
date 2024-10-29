// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { signupUser } from '@/redux/slices/authSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const RegisterForm = () => {
  const dispatch =useDispatch();
  const navigate =useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For capturing any signup errors
  const [loading, setLoading] = useState(false); // For loading state


  // Mark the function as async
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state before submitting

    try {
      const resultAction = await dispatch(signupUser({ email, name, username, password }));
      
      if (signupUser.fulfilled.match(resultAction)) {
        // Redirect to the OTP verification page after successful signup
        navigate('/verify-otp');
      } else {
        setError(resultAction.payload); // Handle signup error
      }
    } catch (error) {
      setError('Signup failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className='flex justify-center items-center flex-col gap-4'>
     <div className='bg-white h-auto w-[90%] max-w-[450px] px-[5%] py-[8%] border border-gray-400 border-opacity-50'>
         <h2 className='text-2xl mb-2 text-center'>Campusshot</h2>
         <p className='text-center mb-6 text-gray-400 text-[14px]'>Sign up to see photos and videos from your campus friends.</p>
            
           <input type='email' placeholder='Email' className='mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none' onChange={(e) => setEmail(e.target.value)}
            required />
           <input type='text' placeholder='Full Name' className='mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none' onChange={(e) => setName(e.target.value)}
            required />
           <input type='text' placeholder='Username' className='mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none' onChange={(e) => setUsername(e.target.value)} required />
           <input type='password' placeholder='Password' className='mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none'   onChange={(e) => setPassword(e.target.value)}
            required />
            {/*  */}
            {error && <p className='text-red-500 mb-4'>{error}</p>} {/* Display error message */}
           <button onClick={handleSubmit} disabled={loading} className='bg-blue-500 text-white px-2 py-2 rounded-xl w-full'> {loading ? 'Signing Up...' : 'Sign Up'}</button>
          
           <div className='mt-4 flex justify-center items-center'>
             <a href='/forgot-password' className='text-blue-500'>Forgot password?</a>
           </div>
          </div>
          {/*  */}
           <div className='bg-white h-auto w-[90%] max-w-[500px] px-[5%] border-opacity-50 py-[3%] border border-gray-400 flex justify-center items-center'>
             <span className='text-sm'>Have an account? <Link to='/' className='text-blue-500'>Login</Link></span>
           </div>
    </div>
  )
}

export default RegisterForm

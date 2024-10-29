// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '@/redux/slices/authSlice'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const {loading,error}=useSelector((state)=>state.auth);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the login action and wait for the result
    const resultAction = await dispatch(loginUser({ username, password }));

    // Check if the login was successful
    if (loginUser.fulfilled.match(resultAction)) {
      navigate('/feed'); // Redirect to /feed on successful login
    }
  };
  return (
    <div className='flex justify-center items-center flex-col gap-4'>
     <div className='bg-white h-[400px] w-[70%] px-[10%] py-[8%] border border-gray-400 border-opacity-50'>
         <h2 className='text-2xl mb-9 text-center'>Campusshot</h2>
            
           <input type='text' placeholder='username' className='mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none' onChange={(e)=>setUsername(e.target.value)} />
           <input type='password' placeholder='Password' className='mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none'  onChange={(e) => setPassword(e.target.value)} />

           
        {/* Display error message if there is an error */}
          {error && <p className='text-red-500 mb-4'>{error}</p>}

          


          {/* Display loading text on button if loading */}
        <button
          onClick={handleSubmit}
          className='bg-blue-500 text-white px-2 py-2 rounded-xl w-full'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
          
           <div className='mt-16 flex justify-center items-center'>
             <a href='/forgot-password' className='text-blue-500'>Forgot password?</a>
           </div>
          </div>
          {/*  */}
           <div className='bg-white h-[30px] w-[70%] px-[10%] border-opacity-50 py-[6%] border border-gray-400 flex justify-center items-center'>
             <span className='text-sm'>Don't have an account? <Link to='/accounts/emailsignup' className='text-blue-500'>Sign up</Link></span>
           </div>
    </div>
   
  )
}

export default LoginForm

import React from 'react';
import LoginForm from '@/components/authComponents/LoginForm';
import mobile from '../assets/images/mobile.png';
import intro from '../assets/images/intro-video.mp4';

const SignIn = () => {
  return (
    <div className="h-[100vh] w-full bg-white flex flex-col justify-center items-center">
      <div className="w-full h-full  flex justify-center items-center">
        {/* Form Section */}
        <div className=" h-[80%] flex justify-center items-center w-full">
          {/* Left and Right Sections */}
          <div className="relative  h-[600px] w-[500px] justify-center items-center hidden md:flex overflow-hidden">
            {/* Mobile Image with Video */}
            
            <video
              src={intro}
              autoPlay
              muted
              loop
              className="absolute top-[7%] left-[50%] transform -translate-x-1/2 h-[80%] rounded-3xl w-[225px] object-cover"
            />
            <img src={mobile} alt="Mobile" className="h-full absolute w-full object-cover " />
          </div>

          <div className=" h-[600px] w-[500px] flex flex-col justify-center items-center">
            {/* Form */}
            <LoginForm />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SignIn;

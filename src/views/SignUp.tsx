// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import React from 'react'
import RegisterForm from '@/components/authComponents/RegisterForm'

const SignUp = () => {
  return (
     <div className="h-[100vh] w-full bg-white flex flex-col justify-center items-center">
      <div className="w-full h-full  flex justify-center items-center">
   
        {/* Form Section */}
       <RegisterForm />
       
      </div>
    </div>
  )
}

export default SignUp

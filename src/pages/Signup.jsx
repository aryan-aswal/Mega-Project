import React from 'react'
import SignupImage from '../assets/Images/signup.webp'
import Template from '../components/core/Auth/Template'
const Signup = () => {
  return (
    <div className='grid min-h-[calc(100vh-10rem)] place-items-center mt-14'>
        <Template
            heading = {"Welcome Back"}
            subheading = {"Build skills for today, tomorrow, and beyond."}
            specialText = {"Education to future-proof your career."}
            image={SignupImage}
            page={"signup"}
        ></Template>
    </div>
  )
}

export default Signup
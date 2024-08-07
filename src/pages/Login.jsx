import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImage from '../assets/Images/login.webp'

const Login = () => {
  return (
    <div className='grid min-h-[calc(100vh-10rem)] place-items-center mt-14'>
        <Template
            heading = {"Welcome Back"}
            subheading = {"Build skills for today, tomorrow, and beyond."}
            specialText = {"Education to future-proof your career."}
            image={loginImage}
            page={"login"}
        ></Template>
    </div>
  )
}

export default Login
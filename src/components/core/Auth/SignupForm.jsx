import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP, signup } from '../../../services/operations.js/AUTH_API';
import { setSignupData } from '../../../slices/authSlice';
import toast from 'react-hot-toast';

const SignupForm = () => {
    const [ accountType, setAccountType ] = useState('Student');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const { firstName, lastName, email, password, confirmPassword } = formData;

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        
        if(password != confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }

        const signUpData = {
            ...formData, 
            accountType: accountType,
        }


        dispatch(setSignupData(signUpData));
        dispatch(sendOTP(email, navigate));

        //RESET
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
          setAccountType('Student');
    }
    const changeHandler = (event) => {
        setFormData((prev) => ({
            ...prev, 
            [event.target.name]: event.target.value,
        }))
    }
  return (
    <div>
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button  className= {`${accountType == 'Student' ? "bg-richblack-900" : "bg-transparent"} text-richblack-200 py-2 px-5 rounded-full transition-all duration-200`} onClick={() => setAccountType('Student')}>Student</button>
            <button className={` ${accountType == 'Instructor' ? "bg-richblack-900" : "bg-transparent"}  bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200`} onClick={() => setAccountType('Instructor')}>Instructor</button>
        </div>
       <form onSubmit={onSubmitHandler}  className='flex w-full flex-col gap-y-4'>
            <div className='flex gap-4 justify-between'>
                <div className='w-[50%]'>
                    <label htmlFor="firstName" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>First Name <sup className='text-pink-200'>*</sup></label>
                    <input 
                        type="firstName" name="firstName" id="firstName" onChange={changeHandler} 
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Enter first name'
                        value={firstName}
                    />
                </div>
                <div className='w-[50%]'>
                    <label htmlFor="lastName" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Last Name <sup className='text-pink-200'>*</sup></label>
                    <input 
                        type="lastName" name="lastName" id="lastName" onChange={changeHandler} 
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Enter last name'
                        value={lastName}
                    />
                    
                </div>
            </div>
            <div>
                <label htmlFor="email" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email <sup className='text-pink-200'>*</sup></label>
                <input 
                    type="email" name="email" id="email" onChange={changeHandler} 
                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                    placeholder='Enter email address'
                    value={email}
                />
            </div>
            <div className='flex justify-between gap-4'>
                <div className='w-[50%] relative'>
                    <label htmlFor="password" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Create Password <sup className='text-pink-200'>*</sup></label>
                    <input 
                        type={`${showPassword ? "text" : "password"}`} name="password" id="password" onChange={changeHandler} 
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Enter Password'
                        value={password}
                    />
                    <span 
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showPassword ? <AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                </div>
                <div className=' w-[50%] relative'>
                    <label htmlFor="confirmPassword" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Confirm Password <sup className='text-pink-200'>*</sup></label>
                    <input 
                        type={`${showConfirmPassword ? "text" : "password"}`} name="confirmPassword" id="confirmPassword" 
                        onChange={changeHandler} className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                    />
                    <span 
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                        {showConfirmPassword ? <AiOutlineEyeInvisible  fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                    </span>
                </div>
            </div>
            <button type="submit" className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900 w-full'>Create Account</button>
       </form>
    </div>
  )
}

export default SignupForm
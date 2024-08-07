import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { updatePassword } from '../services/operations.js/AUTH_API'
import toast from 'react-hot-toast'
const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = location.pathname.split("/").at(-1);

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const [ formData, setFormData ] = useState({
        password: "",
        confirmPassword: ""
    })
    const { password, confirmPassword } = formData;

    const changeHandler = (event) => {
        setFormData(() => ({
            ...formData,
            [event.target.name]: event.target.value
        }))
    }
    const submitHandler = (event) => {
        event.preventDefault();
        if(password == confirmPassword)
            dispatch(updatePassword(password, confirmPassword, token, navigate));
        else 
            toast.error("Password and Confirm Password should be same");
    }
  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        <div className='max-w-[500px] p-4 lg:p-8'>
            <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Choose new password</h1>
            <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>Almost done. Enter your new password and youre all set.</p>
            <form onSubmit={submitHandler}>
                <div className='flex flex-col gap-4'>
                    <div className='relative'>
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
                    <div className='relative'>
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
                <button type='text' className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900 w-full'>Reset Password</button>
            </form>
            <div className="text-richblack-5 mt-3">
                <Link to="/login" className='flex items-center gap-x-2 cursor-pointer w-fit'>
                    <FaArrowLeftLong />
                    <p>Back To Login</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword
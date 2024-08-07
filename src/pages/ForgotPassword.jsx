import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { resetPasswordToken } from '../services/operations.js/AUTH_API';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const ForgotPassword = () => {
    const [ emailSent, setEmailSent ] = useState(false);
    const [ email, setEmail ] = useState("");

    const dispatch = useDispatch();

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(resetPasswordToken(email, setEmailSent))
    }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        <div className='max-w-[500px] p-4 lg:p-8'>
            {
                emailSent ? (<h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Check email</h1>) : (<h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Reset your password</h1>)
            }

            {
                emailSent ? <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>We have sent the reset email to {`${email}`}</p> : <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
            }

            {
                <form onSubmit={submitHandler}>
                    {
                        emailSent ? 
                        null 
                        :
                        <>
                            <div>
                                <label htmlFor="email" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email <sup className='text-pink-200'>*</sup></label>
                                <input 
                                    type="email" name="email" id="email" onChange={(event) => setEmail(event.target.value)} 
                                    className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                                    placeholder='Enter email address'
                                    value={email} 
                                />
                            </div>
                        </>
                    }
                    <button className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>{emailSent ?`Resend Mail` : `Reset Password`}</button>
                </form>
            }
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

export default ForgotPassword
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations.js/AUTH_API';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData;

    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate))
    }
    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler} className='flex w-full flex-col gap-y-4'>
                <div>
                    <label htmlFor="email" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Email <sup className='text-pink-200'>*</sup></label>
                    <input type="email" name="email" id="email" onChange={changeHandler} 
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Enter email address'
                        value={email}
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="password" className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>Password <sup className='text-pink-200'>*</sup></label>
                    <input type="password" name="password" id="password" onChange={changeHandler} 
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 border-richblack-600 border-b-2'
                        placeholder='Enter Password'
                        value={password}
                    />
                    <Link to="/forgot-password">
                        <span className='mt-1 ml-auto max-w-max text-xs text-blue-100 float-end'>Forgot Password</span>
                    </Link>
                    
                </div>
                
                <button type="submit" className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-semibold text-richblack-900'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm 
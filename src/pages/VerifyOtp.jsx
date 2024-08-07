import React, { useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/operations.js/AUTH_API';

const VerifyOtp = () => {
  const [ otp, setOtp ] = useState('');
  const { loading, signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword, accountType } = signupData;
    dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }
  return (
    <div>
      {
        loading ?
          (<div>Loading....</div>)
          :
          (
            <div className='min-h-[calc(100vh-3.5rem)] grid place-items-center'>
              <div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={submitHandler}> 
                  <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      // renderSeparator={<span className=' text-richblack-600'>-</span>}
                      inputStyle="rounded border-[1px] border-richblack-500 text-5xl text-center bg-richblack-700 text-white"
                      focusStyle="border-[5px]"
                      isInputNum={true}
                      shouldAutoFocus={true}
                      containerStyle="flex justify-between"
                      renderInput={(props) => <input {...props} />}
                  />
                  <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 text-richblack-900 font-semibold">Verify Email</button>
                </form>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default VerifyOtp
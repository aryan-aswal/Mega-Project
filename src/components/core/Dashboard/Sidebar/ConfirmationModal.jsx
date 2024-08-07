import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../../services/operations.js/AUTH_API';
import { useDispatch } from 'react-redux';

const ConfirmationModal = ({props}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { heading , para, button_1, button_2, setconfirmationModal } = props
    const logoutCaller = async() => {
        dispatch(logout(navigate));
    }
  return (
    <div>
        <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-50 fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'>
            <h1 className='text-2xl font-semibold text-richblack-5'>{heading}</h1>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>{para}</p>
            <div className='flex items-center gap-x-4'>
                <button onClick={logoutCaller} className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 undefined' >{button_1}</button>
                <button onClick={() => setconfirmationModal(null)}  className='flex items-center bg-richblack-200 cursor-pointer gap-x-2 rounded-md py-2 text-sm md:text-lg px-3 md:px-5 font-semibold text-richblack-900 undefined'>{button_2}</button>
            </div>
        </div>
        <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm over'></div> 
    </div>
  )
}

export default ConfirmationModal
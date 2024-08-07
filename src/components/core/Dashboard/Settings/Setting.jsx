import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuUpload } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { updatePassword, updateProfile, uploadProfileImage } from '../../../../services/operations.js/PROFILE';
import toast from 'react-hot-toast';
import ConfirmationModal from './ConfirmationModal';

const genders = [
  {
    id: 1,
    gender: 'male'
  },
  {
    id: 2,
    gender: 'female'
  },
  {
    id: 3,
    gender: 'Prefer not to say'
  },
  {
    id: 4,
    gender: 'Other'
  },

]

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  // console.log(user);

  const [file, setFile] = useState(user?.image);
  const [profileInfo, setProfileInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateOfBirth: user?.additionalDetails?.dateOfBirth,
    gender: user?.additionalDetails?.gender,
    contactNumber: user?.additionalDetails?.contactNumber,
    about: user?.additionalDetails?.about
  })
  const [ passwordInfo, setPasswordInfo ] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [ confirmationModal, setConfirmationModal ] = useState(null);

  // Profile Image update 
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    setFile(image);
  }

  const handleUpload = (event) => {
    event.preventDefault();
    dispatch(uploadProfileImage(file, token, user));
  }


  // Profile Information update
  const handleInfoChange = (event) => {
    console.log(event.target.name + " " +  event.target.value)
    setProfileInfo(() => {
      return {
        ...profileInfo,
        [event.target.name]: event.target.value
      }
    })
  }

  const submitProfileInfo = (event) => {
    event.preventDefault();
    const dateOfBirth = profileInfo.dateOfBirth.split('-').at(-1) + '.' + profileInfo.dateOfBirth.split('-')[1] + '.' + profileInfo.dateOfBirth.split('-')[0];
    profileInfo.dateOfBirth = dateOfBirth;
    console.log(profileInfo);
    dispatch(updateProfile(profileInfo, user, token))
  }

  // User Password update
  const handlePasswordChange = (event) => {
    setPasswordInfo(() => {
      return {
        ...passwordInfo,
        [event.target.name]: event.target.value,
      }
    })
  }

  const submitPasswordHandler = (event) => {
    event.preventDefault();

    if(!passwordInfo.newPassword || !passwordInfo.confirmPassword) {
      toast.error("Passwords are required");
    }
    console.log(passwordInfo)

    passwordInfo.confirmPassword = passwordInfo.newPassword;
    dispatch(updatePassword(passwordInfo, token));
  }

  const deleteAccount = () => {
    setConfirmationModal({
      heading: "Delete Account",
      para: "Are you sure you want to delete your account?",
      button_1: "Delete",
      button_2: "Cancel"
    })
  }

  return (
    <div className=' flex-1 overflow-auto'>
      <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>

        {/* section 1 */}
        <section className='flex items-center gap-x-7 rounded-md border-[1px] border-richblack-700 bg-richblack-800 md:p-8 md:px-12 px-3 py-3 text-richblack-5'>
          <div className='flex items-center gap-x-4'>
            <img src={user?.image} className='aspect-square w-[78px] rounded-full object-cover' />
          </div>

          <div className='flex flex-col gap-4'>
            <p>Change Profile Picture</p>
            <div>
              <form className='flex gap-3'>
                <label htmlFor='profileImage' className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" >
                  Select
                  <input type="file" name="profileImage" id="profileImage" hidden accept="image/png, image/jpg, image/jpeg" onChange={handleFileChange} />
                </label>

                <button
                  type='submit'
                  className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'
                  onClick={handleUpload}
                >
                  <span>Upload</span>
                  <LuUpload />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section>
          <form className='flex flex-col gap-10 justify-between w-full' onSubmit={submitProfileInfo}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
              <div>
                <h1 className="text-lg font-semibold text-richblack-5">Profile Information</h1>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row justify-between">
                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='firstName' className='label-style'>First Name</label>
                  <input type='text' name='firstName' id='firstName' className='form-style' defaultValue={user?.firstName} placeholder='Enter First Name' onChange={handleInfoChange}/>

                </div>

                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='lastName' className='label-style'>Last Name</label>
                  <input type='text' name='lastName' id='lastName' className='form-style' defaultValue={user?.lastName} placeholder='Enter Last Name' onChange={handleInfoChange}/>

                </div>
              </div>

              <div className="flex flex-col gap-5 lg:flex-row justify-between">
                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='dateOfBirth' className='label-style'>Date Of Birth</label>
                  <input type='date' name='dateOfBirth' id='dateOfBirth' className='bg-richblack-700 py-3 px-3 rounded-lg border-b border-richblack-200' defaultValue={user?.additionalDetails?.dateOfBirth} onChange={handleInfoChange}/>
                </div>

                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='gender' className='label-style'>Gender</label>
                  <select name="gender" id="gender" className='form-style' onChange={handleInfoChange}>
                    {
                      genders.map((item) => {
                        return (
                          <option value={item.gender} key={item.id}>{item.gender}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>


              <div className="flex flex-col gap-5 lg:flex-row justify-between">
                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='contactNumber' className='label-style'>Contact Number</label>
                  <input type='text' name='contactNumber' id='contactNumber' className='form-style' defaultValue={user?.additionalDetails?.contactNumber} placeholder='Enter Contact Number' onChange={handleInfoChange}/>

                </div>

                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='about' className='label-style'>About</label>
                  <input type='text' name='about' id='about' className='form-style' defaultValue={user?.additionalDetails?.about} placeholder='Enter About Yourself' onChange={handleInfoChange} />

                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <span className='bg-richblack-800 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-200'
                onClick={() => navigate('/dashboard/my-profile')}
              >
                Cancel
              </span>
              <button className="bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 " type="submit">Save</button>
            </div>
          </form>
        </section>

        {/* section 3 */}
        <section>
          <form onSubmit={submitPasswordHandler}>
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
              <div>
                <h1 className="text-lg font-semibold text-richblack-5">Password</h1>
              </div>
              <div className="flex flex-col gap-5 lg:flex-row justify-between">
                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='oldPassword' className='label-style'>Old Password</label>
                  <input type='text' name='oldPassword' id='oldPassword' className='form-style' placeholder='Enter Old Password' onChange={handlePasswordChange}/>
                </div>

                <div className='flex flex-col w-[50%]'>
                  <label htmlFor='newPassword' className='label-style'>New Password</label>
                  <input type='text' name='newPassword' id='newPassword' className='form-style' placeholder='Enter New Password' onChange={handlePasswordChange}/>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className='bg-richblack-800 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-200'
                onClick={() => navigate('/dashboard/my-profile')}
              >
                Cancel
              </button>
              <button className="bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 " type="submit">Update</button>
            </div>
          </form>
        </section>


        {/* section 4 */}
        <section>
          <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-3 md:p-8 md:px-12"><div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl text-pink-200" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </div>
            <div className="flex flex-col space-y-2 w-full">
              <h2 className="text-lg font-semibold text-richblack-5">Delete Account</h2>
              <div className="md:w-3/5 text-pink-25"><p>Would you like to delete account?</p>
                <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.
                </p>
              </div>
              <button className="w-fit cursor-pointer italic text-white bg-[#D43D63] px-3 py-4 border-2 border-white" onClick={deleteAccount}>I want to delete my account.</button>
            </div>
          </div>
        </section>
      </div>
      <div>
        {confirmationModal && <ConfirmationModal props={{...confirmationModal, setConfirmationModal}}/>}
      </div>
    </div>
  )
}

export default Setting
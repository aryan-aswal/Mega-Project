import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations.js/courseDetailsAPI';
import IconBtn from '../../../common/IconBtn';
import CoursesTable from './CoursesTable';

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [ courses, setCourses ] = useState([]);

  const fetchCourses = async() => {
    const result = await fetchInstructorCourses(token);
    console.log(result);
    setCourses(result);
  }
  useEffect(() => {
    fetchCourses();
  }, [])
  return (
    <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
      <div  >
        <div className='flex  justify-between items-center'>
          <h1 className='text-3xl font-medium text-richblack-5'>My Courses</h1>
          <IconBtn
            text={"Add Courses"}
            onclick={() => {navigate('/dashboard/add-course')}} 
            className="h-fit"
          />
        </div>

        <div>
          {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
          }
        </div>

      </div>
      
    </div>
  )
}

export default MyCourses
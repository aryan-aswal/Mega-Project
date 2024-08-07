import React from 'react'
import instructor from '../../../assets/Images/Instructor.png'
import HighLightText from './HighLightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-20 items-center'>
            <div className='w-[50%] relative'>
                <img src={instructor} alt="" className='z-10 shadow-white shadow-[-20px_-20px_0_0]'/>
            </div>
            <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an <HighLightText message={"Instructor"} />
                </div>
                <p className='text-richblack-300 font-medium text-[16px] w-[80%] '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                <div className='flex gap-5 items-center'>
                    <Button active={true} link={'/signup'}>
                        Start Teaching Today
                        <FaArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection
import React from 'react'
import HighLightText from './HighLightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareYourProgress from '../../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'

const LearningLanguageSection = () => {
  return (
    <div className='w-11/12 mt-[100px] max-w-maxContent mx-auto'>
      <div className='flex flex-col gap-5 items-center'>
        <div className='text-4xl font-semibold text-center'>
          Your swiss knife for <HighLightText message={"learning any language"}/>
        </div>

        <div className='text-center text-richblack-700 mx-auto text-base mt-3 w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className='flex flex-row items-center justify-center mt-5'>
          <img src={knowYourProgress} alt="" className='object-contain -mr-40'/>
          <img src={compareYourProgress} alt="" className='object-contain ml-10'/>
          <img src={planYourLessons} alt="" className='object-contain -ml-40 rotate-6'/>
        </div>

        <div className='w-fit'>
          <Button active={true} link={'/signup'}>
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection
import React from 'react'

import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
  {
    logo: logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company"
  },
  {
    logo: logo2,
    heading: "Leadership",
    Description: "Fully committed to the success company"
  },
  {
    logo: logo3,
    heading: "Leadership",
    Description: "Fully committed to the success company"
  },
  {
    logo: logo4,
    heading: "Leadership",
    Description: "Fully committed to the success company"
  },
]

const TimeLineSection = () => {
  return (
    <div className='w-11/12 mx-auto max-w-maxContent mt-[100px]'>
        <div className='flex flex-row gap-16 items-center'>
          <div className='flex flex-col gap-10 w-[45%]'>
            {
              timeline.map((element, index) => {
                return (
                  <div className='flex flex-row gap-6' key={index}>

                    <div className='items-center flex bg-white w-[50px] h-[50px] rounded-full justify-center relative'>
                      <img src={element.logo} alt="" />
                    </div>

                    <div>
                      <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                      <p className='text-base'>{element.Description}</p>
                    </div>

                  </div>
                )
              })
            }
          </div>

          <div className='relative shadow-blue-200 gap-16'>
            <img src={timelineImage} alt="" className='shadow-white object-cover h-fit' />

            <div className='absolute bg-caribbeangreen-700 text-white flex uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
              <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
              </div>

              <div className='flex gap-5 items-center px-7'>
                <p className='text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-300 text-sm'>Types of courses</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TimeLineSection
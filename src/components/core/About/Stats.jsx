import React from 'react'
const statsData = [
  {
    count: "5K",
    label: "Students",
  },
  {
    count: "10+",
    label: "Mentors",
  },
  {
    count: "200+",
    label: "Courses",
  },
  {
    count: "50+",
    label: "Awards",
  },
]
const Stats = () => {
  return (
    <div className='flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto '>
      <div  className='grid grid-cols-2 md:grid-cols-4 text-center '>
        {
          statsData.map((data, index) => {
            return (
              <div key={index} className="flex flex-col py-10">
                <h1 className='text-[30px] font-bold text-richblack-5'>{data.count}</h1>
                <h1>{data.label}</h1>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Stats
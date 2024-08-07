import React, { useState } from 'react'

const CourseCard = ({course, currentCard, setCurrentCard}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`flex w-[360px] h-[300px] box-border cursor-pointer transition-all duration-200
            ${currentCard === course.heading ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "text-richblack-25 bg-richblack-800"}`}
            onClick={() => {setCurrentCard(course.heading)}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='hover:bg-white'>
                <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'>
                    <p className={`font-semibold text-[20px] transition-all duration-20 ${isHovered ? "text-richblack-800" : currentCard === course.heading ?  "text-richblack-800" : "text-richblack-25"}`} >{course.heading}</p>
                    <p className='text-richblack-400'>{course.description}</p>
                </div>
                <div className='flex justify-between text-blue-300 px-6 py-3 font-medium' >
                    <p>{course.level}</p>
                    <p>{course.lessionNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
import React, { useState } from 'react'
import {HomePageExplore} from '../../../data/homepage-explore'
import HighLightText from './HighLightText'
import CourseCard from './CourseCard'

const tabs = [
    "Free", 
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]
const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setCards = (value) => {
        setCurrentTab(value);
        const courses = HomePageExplore.filter((course) => {
            return course.tag === value
        });
        setCourses(courses[0].courses);
        setCurrentCard(courses[0].courses[0].heading);
    } 
  return (
    <div className='w-11/12 mx-auto relative'>
        <div className='text-4xl font-bold text-center'>
            Unlock the <HighLightText message={"Power of code"}/>
        </div>
        <p className=' text-center text-richblack-300 text-[16px] mt-3 font-semibold'>Learn to build anything you can imagine</p>
        <div className='flex bg-richblack-800 rounded-full mb-5 border-richblack-600 mt-5 border-2 px-1 py-1 w-fit mx-auto'>
            {
                tabs.map((tab, index) => {
                    return (
                        <div 
                        className={`text-[16px] flex flex-row items-center gap-2 rounded-full duration-200 transition-all cursor-pointer 
                        hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 mx-1
                        ${tab === currentTab ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"}`} 
                        key={index} onClick={() => setCards(tab)}>      
                            {tab}
                        </div>
                    )
                })
            }
        </div>
        <div className='h-[300px]'></div>

        <div className=' absolute top-[50%] flex gap-10 w-full justify-between group'>
            {
                courses.map((course, index) => {
                    return (
                        <div key={index} className=''>
                            <CourseCard course={course} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import HighLightText from '../components/core/HomePage/HighLightText'
import Button from '../components/core/HomePage/Button'
import banner from '../assets/Images/banner.mp4'
import ReactPlayer from 'react-player'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimeLineSection from '../components/core/HomePage/TimeLineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col text-white w-11/12 justify-between items-center max-w-maxContent'>
            <NavLink to={'/signup'}>
                <div className='group mx-auto rounded-full bg-richblack-800 text-richblack-200 font-bold transition-all duration-200 hover:scale-95 mt-16 p-1 w-fit'>
                    <div className='flex items-center gap-3 rounded-full py-[10px] px-10 transition-all duration-200 group-hover:bg-richblack-900 border-b-2 border-richblack-600 hover:border-none'>
                        <p>Become an instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </NavLink>

            <div className='text-white text-center text-4xl font-semibold mt-7'>
                Empower Your Future with <HighLightText message={"Coding Skills"} />
            </div>

            <div className='w-[90%] text-center text-lg text-richblack-300 mt-4 font-bold'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, 
                including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex gap-7 mt-8'>
                <div>
                    <Button active={true} link={"/signup"}>Learn More</Button>
                </div>
                <div>
                    <Button active={false} link={"/login"}>Book a Demo</Button>
                </div>
            </div>

            <div className='relative my-12 shadow-blue-200 shadow-[-5px_-10px_50px_-5px] w-fit mx-auto'>
                <div className='shadow-[20px_20px_rgba(255,255,255)] shadow-white'>
                    <ReactPlayer
                        url={banner}
                        loop={true}
                        playing={true}
                        width="90%"
                        height="90%"
                        onError={(e) => console.error('Error playing video:', e)} 
                        muted={true}
                    />
                </div>
            </div>

            <div>
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading = {
                        <span>
                            Unlock Your <HighLightText message="coding potential "></HighLightText> with our online courses
                        </span>
                    }
                    subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    btn1="Try it yourself " btn2 ="Learn more" 
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    codecolor={"text-yellow-25"}
                    link1={'/signup'}
                    link2={'/login'}
                    backgroundGradient={"gradient-yellow"}
                />

                <CodeBlocks 
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                    btn1={"Continue Lesson"}
                    btn2={"Learn More"}
                    heading={
                        <span>
                            Start <HighLightText message={"coding in seconds "}></HighLightText>
                        </span>
                    }
                    subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    codecolor={"text-richblack-5"}
                    position={"lg:flex-row-reverse"}
                    link1={'/login'}
                    link2={'/signup'}
                    backgroundGradient={"gradient-blue"}
                />
            </div>

            <ExploreMore />
            
        </div>

        {/* Section 2 */}
        <div className=' bg-pure-greys-5 text-richblack-700 pb-[100px]'>
            <div className='homepage_bg h-[333px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto justify-between'>
                    <div className='h-[150px]'>

                    </div>

                    <div className='flex gap-7 text-white'>
                        <div>
                            <Button active={true} link={"/signup"}>Explore Full Catlog <FaArrowRight /></Button>
                        </div>
                        <div>
                            <Button active={false} link={"/login"}>Learn More</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between mt-[100px]'>
                <div className='flex gap-5 justify-between'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the Skills you need for a <HighLightText message={`Job that is in demand`}/>
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <Button active={true} link={'/signup'}>Learn More</Button>
                    </div>
                </div>

            </div>

            <TimeLineSection />
            <LearningLanguageSection />
        </div>

        {/* Section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col gap-8 items-center justify-between bg-richblack-900 text-white'>
            <InstructorSection />
            <h2 className='text-4xl text-center font-semibold mt-10'>Reviews from Other Learners</h2>
            <ReviewSlider />
        </div>

        {/* Section 4 */}
        <Footer />
    </div>
  )
}

export default Home
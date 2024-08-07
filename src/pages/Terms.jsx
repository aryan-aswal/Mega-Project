import React from 'react'
import data from '../data/terms-and-conditions.json'
import Footer from '../components/common/Footer'
const Terms = () => {
  return (
    <div className='w-full mx-auto text-richblack-25 bg-richblack-900'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between py-20'>
            <h1 className='text-4xl font-semibold lg:w-[70%]'>Terms and Conditions</h1>
            <span className='italic text-sm mt-1 mb-10'>These Terms and Conditions were last updated on Aug 7, 2024</span>
            <p className='mb-10 text-richblack-300'>Welcome to StudyNotion. These Terms and Conditions ("Terms") govern your access to and use of the Site, including any content, features, and services provided. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you should not use the Site.</p>

            <div>
                {
                    data.map((term, index) => {
                        return (
                            <div key={index} className='mb-7'>
                                <h1 className='text-2xl font-semibold mb-2 text-richblack-25'>{index + 1}. {term.heading}</h1>
                                <p className='ml-7 text-richblack-300'>{term.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Terms
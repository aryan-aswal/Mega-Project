import React from 'react'
import data from '../data/privacy-policy.json'
import Footer from '../components/common/Footer'
const PrivacyPolicy = () => {
  return (
    <div className='w-full mx-auto text-richblack-25 bg-richblack-900'>
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between py-20'>
            <h1 className='text-4xl font-semibold lg:w-[70%]'>Privacy Policies</h1>
            <span className='italic text-sm mt-1 mb-10'>These Privacy Policies were last updated on Aug 7, 2024</span>
            <p className='mb-10 text-richblack-300'>Welcome to StudyNotion. We are committed to protecting your privacy and ensuring a secure online experience. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our Site or purchase our courses. By using our Site, you consent to the practices described in this Privacy Policy.</p>

            <div>
                {
                    data.map((policy, index) => {
                        return (
                            <div key={index} className='mb-7'>
                                <h1 className='text-2xl font-semibold mb-2 text-richblack-25'>{index + 1}. {policy.heading}</h1>
                                <p className='ml-7 text-richblack-300'>{policy.paragraph}</p>
                                {
                                    policy.list !== undefined ? 
                                    (<ul className='list-disc ml-14 mt-2 text-richblack-25'>
                                        {
                                            policy.list.map((item, index) => {
                                                return (
                                                    <li key={index}><span className='font-bold'>{item.subHeading}:</span> <span className='text-richblack-300'>{item.subParagraph}</span></li>
                                                )
                                            })
                                        }
                                    </ul>) 
                                    : 
                                    (<></>)
                                }
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

export default PrivacyPolicy
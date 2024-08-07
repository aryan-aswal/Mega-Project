import React from 'react'
import ContactForm from '../ContactPage/ContactForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
      <h1 className='text-center text-4xl font-semibold'>
        Get in Touch
      </h1>
      <p className='text-center text-richblack-300 mt-3'>
        We'd love to here for you, Please fill out this form.
      </p>
      <div className='mt-10'>
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactFormSection
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../HomePage/Button';
import CountryCode from '../../../data/countrycode.json'
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../../services/operations.js/CONTACT_US_API';

const ContactForm = () => {
    const dispatch = useDispatch();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
                phoneNumber: "",
            })
        }
    }, [reset, isSubmitSuccessful]);

    const contactFormSubmit = (data) => {
        const phoneNumber = data.countrycode + " " + data.phoneNumber;
        const { firstName, lastName, email, message } = data;
        dispatch(contactUs(firstName, lastName, email, message, phoneNumber));
    }
    return (
        <div>
            <form onSubmit={handleSubmit(contactFormSubmit)} className={"flex flex-col gap-7"}>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstName" className="lable-style">First Name <sup className='text-pink-300'>*</sup></label>
                        <input
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            {...register("firstName", { required: true })}
                            className="form-style"
                        />
                        {
                            errors.firstName && (
                                <span className=" text-pink-300">Please enter your first name</span>
                            )
                        }
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="lastName" className="lable-style">Last Name <sup className='text-pink-300'>*</sup></label>
                        <input
                            type="text"
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            {...register("lastName", { required: true })}
                            className="form-style"
                        />
                        {
                            errors.lastName && (
                                <span className="text-pink-300">Please enter your last name</span>
                            )
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="lable-style">Email <sup className='text-pink-300'>*</sup></label>
                    <input
                        type="email"
                        name='email'
                        id='email'
                        placeholder='Enter email'
                        {...register("email", { required: true })}
                        className="form-style"
                    />
                    {
                        errors.email && (
                            <span className=" text-pink-300">Please enter your email</span>
                        )
                    }
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="phoneNumber" className="lable-style">Phone Number <sup className='text-pink-300'>*</sup></label>
                    <div className='flex flex-row gap-5'>
                        <div className='flex w-[76px] flex-col gap-2'>
                            <select name="countrycode" id="countrycode" {...register('countrycode', { required: true })} className="form-style">
                                {
                                    CountryCode.map((element, index) => {
                                        return (
                                            <option value={element.code} key={index}>{element.code} - {element.country}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                            <input 
                                type="Number" 
                                name="phoneNumber" 
                                id="phoneNumber" 
                                placeholder="12345 67890" 
                                className="form-style" 
                                {...register("phoneNumber", 
                                    { 
                                        required: { value: true, message: "Please enter phone Number *" }, 
                                        maxLength: { value: 10, message: "Enter a valid Phone Number *" }, 
                                        minLength: { value: 8, message: "Enter a valid Phone Number *" } 
                                    })
                                } 
                            />
                            {
                                errors.phoneNo && <span className=" text-yellow-25">{errors.phoneNo.message}</span>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="lable-style">Message <sup className='text-pink-300'>*</sup></label>
                    <textarea
                        name="messsage"
                        id="message"
                        cols={30}
                        rows={7}
                        placeholder='Enter your message here'
                        {...register('message', { required: true })}
                        className="form-style"
                    >
                        {
                            errors.message && (
                                <span className=" text-yellow-25">Please enter message</span>
                            )
                        }
                    </textarea>
                </div>
                <button type='submit' className="rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] ">Send Message</button>
            </form>
        </div>
    )
}

export default ContactForm
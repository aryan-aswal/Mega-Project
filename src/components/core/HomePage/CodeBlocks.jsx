import React from 'react'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({ btn1, link1, link2, btn2, position, heading, subheading, codeblock, backgroundGradient, codecolor }) => {
    return (
        <div className={`flex ${position} my-20 justify-between gap-10`}>
            <div className='gap-8 flex flex-col w-[100%] lg:w-[50%]'>
                <p className='text-4xl font-semibold'>{heading}</p>
                <p className='text-richblack-300 font-bold'>{subheading}</p>
                <div className='flex gap-7 mt-8'>
                    <div>
                        <Button active={true} link={link1}>{btn1}<FaArrowRight /> </Button>
                    </div>
                    <div>
                        <Button active={false} link={link2}>{btn2}</Button>
                    </div>
                </div>
            </div>
            <div className='h-fit flex text-[16px] w-[100%] py-4 lg:w-[500px] relative glass'>
                <div className=' text-center flex flex-col w-[10%] font-inter text-richblack-400 font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor} pr-2`}>
                    <div className={`${backgroundGradient}`}></div>
                    <TypeAnimation 
                        sequence={[codeblock, 5000, ""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        cursor={true}
                        style={
                           {
                            whiteSpace: "pre-line",
                            display: "block",
                           }
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks
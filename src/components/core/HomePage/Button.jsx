import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children, active, link}) => {
  return (
    <Link to={link}>
        <div className={`flex items-center justify-center gap-2 cursor-pointer text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] hover:shadow-none hover:scale-95 transition-all duration-200 ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}`}>
            {children}
        </div>
    </Link>
    
  )
}

export default Button
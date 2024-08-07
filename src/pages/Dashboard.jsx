import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarSection from '../components/core/Dashboard/Sidebar/SidebarSection'

const Dashboard = () => {
  return (
    <div className='relative flex bg-richblack-400 text-white'>
        <div className='text-white'>
            <SidebarSection />
        </div>
        <div className=' flex-1 overflow-auto bg-richblack-900'>
            <div className='py-10'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard
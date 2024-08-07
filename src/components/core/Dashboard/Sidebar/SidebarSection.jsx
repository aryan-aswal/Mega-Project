import React, { useState } from 'react'
import { sidebarLinks } from '../../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import { useSelector } from 'react-redux'
import { matchPath, useLocation } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";
import ConfirmationModal from './ConfirmationModal'

const SidebarSection = () => {
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const [ confirmationModal, setconfirmationModal ] = useState(null);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  }
  const clickHandler = () => {
    if(!confirmationModal) {
      setconfirmationModal({
        heading: "Are you Sure ?",
        para: "You will be logged out of your account.",
        button_1: "Logout",
        button_2: "Cancel"
      })
    } else {
      setconfirmationModal(null)
    }
  }
  return (
    <div className='text-white bg-richblack-800 h-full'>
      <div className='hidden min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 lg:flex min-h-[calc(100vh-3.5rem)] h-full bg-richblack-800 py-10'>
        <div className='flex flex-col'>
          {
            sidebarLinks.map((link) => {
              if (!link.type || link.type === user?.accountType) {
                return (
                  <div key={link.id} className={`py-2 px-4 relative md:px-8 md:py-2 text-sm font-medium transition-all duration-300  tracking-wider ${matchRoute(link.path) ? ("bg-yellow-800 text-yellow-5") : ("bg-opacity-0") }`}>
                    <SidebarLink
                      name={link.name}
                      path={link.path}
                      iconName={link.icon}
                    />
                    <span className={`absolute bottom-0 left-0 md:top-0 h-[0.2rem] w-full md:h-full md:w-[0.2rem] bg-yellow-50 opacity-0 transition-all duration-300 ${matchRoute(link.path) ? "opacity-100": "opacity-0"}`}></span>
                  </div>
                )
              }
            })
          }
        </div>
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
        <div>
          <div className={`py-2 px-4 relative md:px-8 md:py-2 text-sm font-medium transition-all duration-300  tracking-wider ${matchRoute('dashboard/settings') ? ("bg-yellow-800 text-yellow-5") : ("bg-opacity-0") }`}>
            <SidebarLink 
              name='Settings'
              path='/dashboard/settings'
              iconName='VscGear'
            />
            <span className={`absolute bottom-0 left-0 md:top-0 h-[0.2rem] w-full md:h-full md:w-[0.2rem] bg-yellow-50 opacity-0 transition-all duration-300 ${matchRoute('/dashboard/settings') ? "opacity-100": "opacity-0"}`}></span>
          </div>
          <div className=' py-2 px-4 relative md:px-8 md:py-2 text-sm font-medium transition-all duration-300  tracking-wider'>
            <span 
              className='cursor-pointer flex items-center gap-2'
              onClick={clickHandler}
            >
              <LuLogOut className="md:text-lg text-3xl"/>
              <span>Logout</span>
            </span>
          </div>
        </div>
      </div>
      <div>
        {confirmationModal && <ConfirmationModal props={{...confirmationModal, setconfirmationModal}}/>}
      </div>
    </div>
  )
}

export default SidebarSection
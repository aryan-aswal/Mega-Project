import React from 'react'
import * as icons from 'react-icons/vsc'
import { Link } from 'react-router-dom'

const SidebarLink = ({ name, path, iconName }) => {
    const Icon = icons[iconName];
    return (
        <Link to={path}>
            <div className='relative flex items-center gap-2'>
                <Icon className="md:text-lg text-3xl"/>
                <span>{name}</span>
            </div>
        </Link>
    )
}

export default SidebarLink
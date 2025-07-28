import React from 'react'
import { Outlet } from 'react-router-dom'

const NoSidebarLayout = () => {
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default NoSidebarLayout
import React from 'react'
import { Outlet } from 'react-router-dom'
import TheNavbar from '../shared/NavBar'

function MainLayout() {
  return (
    <div>
      <TheNavbar />
      <Outlet />
    </div>
  )
}

export default MainLayout

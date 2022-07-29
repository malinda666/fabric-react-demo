import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TheNavbar() {
  function activeStyle(isActive) {
    return isActive ? { color: 'red' } : {}
  }

  return (
    <p>
      <NavLink style={({ isActive }) => activeStyle(isActive)} to='/'>
        Home
      </NavLink>
      {` - `}
      <NavLink style={({ isActive }) => activeStyle(isActive)} to='/product'>
        Product
      </NavLink>
      {` - `}
      <NavLink to='/login'>Login</NavLink>
    </p>
  )
}

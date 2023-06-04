import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to='/' activeClassName='active'>Home</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar

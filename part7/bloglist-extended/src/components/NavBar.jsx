import PropTypes from 'prop-types'
import React from 'react'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

const NavBar = ({ user }) => {
  const style = {
    paddingRight: 5
  }

  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
    dispatch(setNotification('Logout successfuly', 3000))
  }

  return (
    <nav style={{
      display: 'inline'
    }}
    >
      <NavLink to='/' style={style}>Home</NavLink>
      <NavLink to='/users' style={style}>Users</NavLink>
      <span>| Logged in as {user.username}</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

NavBar.propTypes = {
  user: PropTypes.object.isRequired
}

export default NavBar

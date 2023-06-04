import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import Protected from './pages/Protected'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
    dispatch(setNotification('Logout successfuly', 3000))
  }

  return (
    <Router>
      <h2>Blog List</h2>
      {user &&
        (
          <>
            <NavBar />
            <p>
              Logged in as {user.username}
              <button onClick={handleLogout}>Logout</button>
            </p>
          </>
        )}
      <Notification />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          exact
          path='/'
          element={
            <Protected redirectPath='/login'>
              <Home />
            </Protected>
          }
        />
        <Route
          path='/users'
          element={
            <Protected redirectPath='/login'>
              <Users />
            </Protected>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

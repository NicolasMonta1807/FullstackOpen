import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import UserProfile from './pages/UserProfile'
import BlogInfo from './pages/BlogInfo'
import Protected from './pages/Protected'
import Notification from './components/Notification'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector(({ user }) => user)

  return (
    <Router>
      <h2>Blog List</h2>
      {user &&
        (
          <>
            <div>
              <NavBar user={user} />
            </div>
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
        <Route
          path='/users/:id'
          element={
            <Protected redirectPath='/login'>
              <UserProfile />
            </Protected>
          }
        />
        <Route
          path='/blogs/:id'
          element={
            <Protected redirectPath='/login'>
              <BlogInfo />
            </Protected>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

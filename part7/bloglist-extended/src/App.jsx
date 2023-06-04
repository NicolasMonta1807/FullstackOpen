import { useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogsReducer'

const App = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
    dispatch(setNotification('Logout successfuly', 3000))
  }

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(newBlog(blog, user))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && <LoginForm />}
      {user && (
        <div>
          <div>
            <p>
              Logged in as {user.username}
              <button onClick={handleLogout}>Logout</button>
            </p>
          </div>
          <div>
            <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
          </div>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App

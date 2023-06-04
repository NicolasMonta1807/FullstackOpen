import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
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

  const createBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.post(blogObject, user)
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))
      setMessage(`Blog ${newBlog.title} by ${newBlog.author} created`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('Invalid request')
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} error={error} />
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

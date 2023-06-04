import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

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

  const likeBlog = async blog => {
    const blogUpdated = await blogService.update(
      blog.id,
      {
        ...blog,
        user: blog.user.id,
        likes: blog.likes + 1
      },
      user
    )
    setBlogs(
      blogs.map(blog => {
        if (blog.id === blogUpdated.id) {
          return {
            ...blog,
            likes: blogUpdated.likes
          }
        }
        return blog
      }).sort((a, b) => a.likes < b.likes ? 1 : -1)
    )
  }

  const handleDelete = async (blogId) => {
    await blogService.deleteBlog(blogId, user)
    setBlogs(blogs.filter(blog => blog.id !== blogId))
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
          {blogs.map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => likeBlog(blog)}
              userId={user.username}
              handleDelete={() => handleDelete(blog.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App

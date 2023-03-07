import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
      setMessage("Login succesfully")
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000);
    } catch (exception) {
      setMessage("Wrong credentials")
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 3000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setMessage("Logout succesfully")
    setError(false)
    setTimeout(() => {
      setMessage(null)
    }, 3000);
  }

  const LoginForm = () => (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input 
            type="text" 
            value={username}
            name="username"
            onChange={({target}) => setUsername(target.value)}
           />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            value={password}
            name="password"
            onChange={({target}) => setPassword(target.value)}
           />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.post(blogObject, user)
      setBlogs(blogs.concat(newBlog))
      setMessage(`Blog ${newBlog.title} by ${newBlog.author} created`)
      setError(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage("Invalid request")
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
      {!user && LoginForm()}
      {user && 
        <div>
          <div>
            <p>Logged in as {user.username}
              <button onClick={handleLogout}>Logout</button>
            </p>
          </div>
          <div>
            <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog}/>
            </Togglable>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)}
        </div>
      }
      
    </div>
  )
}

export default App
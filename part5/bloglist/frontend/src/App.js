import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

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
      setUsername("")
      setPassword("")
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      console.log('Wrong Credentials');
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
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

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.post({
      blog: {
        title, author, url
      },
      user
    })
    setBlogs(blogs.concat(newBlog))
  }

  const BlogForm = () => (
    <div>
      <form onSubmit={createBlog} >
        <div>
          <label htmlFor="title">Title: </label>
          <input 
            type="text" 
            name="title"
            value={title}
            onChange={({target}) => {setTitle(target.value)}}
            />
        </div>
        <div>        
          <label htmlFor="author">Author: </label>
          <input 
            type="text" 
            name="author"
            value={author}
            onChange={({target}) => {setAuthor(target.value)}}
          />
        </div>
        <div>        
          <label htmlFor="url">Url: </label>
          <input 
            type="text" 
            name="url"
            value={url}
            onChange={({target}) => {setUrl(target.value)}}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {!user && LoginForm()}
      {user && 
        <div>
          <div>
            <p>Logged in as {user.username}
              <button onClick={handleLogout}>Logout</button>
            </p>
          </div>
          <div>
            {BlogForm()}
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />)}
        </div>
      }
      
    </div>
  )
}

export default App
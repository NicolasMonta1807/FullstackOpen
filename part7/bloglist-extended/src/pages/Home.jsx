import { useEffect, useRef } from 'react'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import BlogList from '../components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, newBlog } from '../reducers/blogsReducer'

const Home = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(newBlog(blog, user))
  }
  return (
    <div>
      <div>
        <div />
        <div>
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
        <BlogList />
      </div>
    </div>
  )
}

export default Home

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, likeBlog, removeBlog } from '../reducers/blogsReducer'
import { useEffect } from 'react'

const BlogInfo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  if (!blog) {
    return <div>Loading...</div>
  }

  const handleLike = () => {
    dispatch(likeBlog(blog, user))
  }

  const handleDelete = () => {
    dispatch(removeBlog(blog, user))
    navigate('/')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        This blog was written by {blog.author} - Read it{' '}
        <a href={blog.url} target='_blank' rel='noreferrer'>
          here
        </a>{' '}
      </p>
      <p>Posted by: {blog.author}</p>
      <div id='blogDetails'>
        <div style={{ display: 'inline' }}>
          <p style={{ display: 'inline', marginRight: 5 }}>Likes: {blog.likes}</p>
          <button onClick={handleLike}>Like</button>
        </div>

        <p>Created by: {blog.user.username}</p>
        {user.username === blog.user.username && (
          <button onClick={handleDelete}>Remove</button>
        )}
      </div>
    </div>
  )
}

export default BlogInfo

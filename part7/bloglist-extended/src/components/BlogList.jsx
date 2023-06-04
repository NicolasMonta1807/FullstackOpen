import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const handleLike = (blog) => {
    dispatch(likeBlog(blog, user))
  }

  const handleDelete = (blog) => {
    dispatch(removeBlog(blog, user))
  }

  return (
    <div className='blogs'>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          userId={user.username}
          handleDelete={() => handleDelete(blog)}
        />
      ))}
    </div>
  )
}

export default BlogList

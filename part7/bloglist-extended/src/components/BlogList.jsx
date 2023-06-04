import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)

  return (
    <div className='blogs'>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => console.log('Like for: ', blog.title)}
          userId={user.username}
          handleDelete={() => console.log('Delete: ', blog.title)}
        />
      ))}
    </div>
  )
}

export default BlogList

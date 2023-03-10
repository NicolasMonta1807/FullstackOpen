import { useState } from 'react'

const Blog = ({ blog, handleLike, userId, handleDelete }) => {
  const [viewDetails, setviewDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setviewDetails(!viewDetails)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>
          {viewDetails ? 'hide' : 'view'}
        </button>
      </div>
      {viewDetails && (
        <div>
          <p>Find it on: {blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button onClick={handleLike}>Like</button>
          </p>
          <p>Created by: {blog.user.username}</p>
          {userId === blog.user.username ? (
            <button onClick={handleDelete}>Remove</button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Blog

import PropTypes from 'prop-types'
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
    <div id='blog' style={blogStyle}>
      <div id='blogHeader'>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>
          {viewDetails ? 'Hide' : 'View'}
        </button>
      </div>
      {viewDetails && (
        <div id='blogDetails'>
          <p>Find it <a href={blog.url} target='_blank' rel='noreferrer'>here</a></p>
          <p>
            Likes: {blog.likes}
            <button onClick={handleLike}>Like</button>
          </p>
          <p>Created by: {blog.user.username}</p>
          {userId === blog.user.username
            ? (
              <button onClick={handleDelete}>Remove</button>
              )
            : null}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default Blog

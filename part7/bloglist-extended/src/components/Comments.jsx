import PropTypes from 'prop-types'

const Comments = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default Comments

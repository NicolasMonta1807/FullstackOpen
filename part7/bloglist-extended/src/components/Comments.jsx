import PropTypes from 'prop-types'

const Comments = ({ comments }) => {
  return (
    <div>
      <ul>
        {comments.length !== 0
          ? comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))
          : <i>Be the first to comment something</i>}
      </ul>
    </div>
  )
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default Comments

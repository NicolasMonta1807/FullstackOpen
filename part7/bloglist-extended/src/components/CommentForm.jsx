import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const { id } = useParams()

  const handleComment = (e) => {
    e.preventDefault()
    setComment('')
    dispatch(commentBlog(id, comment))
  }

  return (
    <div>
      <form onSubmit={handleComment}>
        <input
          type='text'
          name='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default CommentForm

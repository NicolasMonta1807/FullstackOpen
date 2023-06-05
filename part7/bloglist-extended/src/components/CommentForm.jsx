import { useState } from 'react'

const CommentForm = () => {
  const [comment, setComment] = useState('')

  const handleComment = () => {
    console.log('Sending comment')
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

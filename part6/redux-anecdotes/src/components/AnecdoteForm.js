import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeMessage, clearMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(changeMessage('New anecdote created'))
    setTimeout(() => dispatch(clearMessage()), 5000)
  }

  return (
    <div>
      <form onSubmit={addNewAnecdote}>
        <label htmlFor='content'>Anecdote: </label>
        <input type='text' name='content' />
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

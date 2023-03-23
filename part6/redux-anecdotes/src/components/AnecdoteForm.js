import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { changeMessage, clearMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.content.value
    event.target.content.value = ''
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch(createAnecdote(newAnecdote))
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

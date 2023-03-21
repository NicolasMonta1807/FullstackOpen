import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(anecdote))
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

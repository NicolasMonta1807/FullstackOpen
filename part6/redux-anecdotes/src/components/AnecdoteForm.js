import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`new anecdote '${content}'`, 5))
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

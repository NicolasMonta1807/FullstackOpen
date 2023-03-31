import { useDispatchValue } from '../AnecdotesContext'
import { useQueryClient, useMutation } from 'react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatchValue()

  const newAnecdoteMutator = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: error => {
      const errorMessage = error.response.data.error
      dispatch({ type: 'SET_MESSAGE', payload: errorMessage })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGE' })
      }, 5000)
    }
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutator.mutate({ content, votes: 0 })
    dispatch({ type: 'SET_MESSAGE', payload: `Anecdote '${content}' created` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_MESSAGE' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

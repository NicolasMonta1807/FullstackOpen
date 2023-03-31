import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, updateAnecdote } from './requests'
import { useDispatchValue } from './AnecdotesContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatchValue()

  const voteAnecdoteMutator = useMutation(updateAnecdote, {
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData(
        'anecdotes',
        anecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
    }
  })

  const handleVote = anecdote => {
    voteAnecdoteMutator.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'SET_MESSAGE', payload: `Anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_MESSAGE' })
    }, 5000)
  }

  const { data, isLoading, isError } = useQuery('anecdotes', getAll, {
    retry: false
  })

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return (
      <div>Anecdotes service is not available due to internal server error</div>
    )
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

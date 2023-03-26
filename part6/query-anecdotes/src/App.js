import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAll } from './requests'

const App = () => {
  const handleVote = anecdote => {
    console.log('vote')
  }

  const { data, isLoading, isError } = useQuery('anecdotes', getAll, { retry: false })

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return <div>Anecdotes service is not available due to internal server error</div>
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

import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => (
  <div>
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  </div>
)

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1)
    }
    return anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))
  })

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => dispatch(voteAnecdote(anecdote.id))} />
      ))}
    </div>
  )
}

export default Anecdotes

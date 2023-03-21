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
  const anecdotes = useSelector(state => state.sort((a, b) => a.votes < b.votes ? 1 : -1))

  return (
    <div>
      {anecdotes.map(anecdote => (
        <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => dispatch(voteAnecdote(anecdote.id))} />
      ))}
    </div>
  )
}

export default Anecdotes

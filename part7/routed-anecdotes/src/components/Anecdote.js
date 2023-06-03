import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find((a) => a.id === Number(id))
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Has {anecdote.votes} votes</p>
      <p>
        For more info{' '}
        <a href={anecdote.info} target='_blank' rel='noreferrer'>
          click here
        </a>
      </p>
    </div>
  )
}

export default Anecdote

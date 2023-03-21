import AnecdoteForm from './components/AnecdoteForm'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => (
  <div>
    <Notification />
    <Filter />
    <Anecdotes />
    <AnecdoteForm />
  </div>
)

export default App

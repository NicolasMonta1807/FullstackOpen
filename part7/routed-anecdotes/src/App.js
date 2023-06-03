import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import CreateAnecdote from './components/CreateAnecdote'
import Footer from './components/Footer'
import About from './components/About'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const sendNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div className='container'>
      <h1>Software anecdotes</h1>
      <Router>
        <div>
          <Menu />
        </div>
        <div>
          {notification &&
            <Alert variant='success'>
              {notification}
            </Alert>}
        </div>
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route
            path='/anecdotes/:id'
            element={<Anecdote anecdotes={anecdotes} />}
          />
          <Route path='/create' element={<CreateAnecdote addNew={addNew} sendNotification={sendNotification} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}

export default App

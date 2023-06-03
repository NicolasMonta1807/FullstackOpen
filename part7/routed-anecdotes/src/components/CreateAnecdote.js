import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CreateAnecdote = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.sendNotification(`New anecdote: ${content.value} created!`)
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Content: </Form.Label>
          <Form.Control
            name='username'
            type='text'
            onChange={content.onChange}
          />
          <Form.Label>Author: </Form.Label>
          <Form.Control
            name='author'
            type='text'
            onChange={author.onChange}
          />
          <Form.Label>Info: </Form.Label>
          <Form.Control
            name='info'
            type='text'
            onChange={info.onChange}
          />
          <Button variant='primary' type='submit'>Create</Button>
          <Button onClick={handleReset}>Reset</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateAnecdote

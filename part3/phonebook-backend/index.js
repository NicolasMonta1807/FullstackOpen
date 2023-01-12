const express = require('express')

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
]

const app = express()

app.get('/info', (request, response) => {
  console.log(request.headers)
  response
    .status(200)
    .send(
      `<p>Phonebook has info for ${
        persons.length
      } people</p> <p>${new Date()}</p>`
    )
})

app.get('/api/persons', (request, response) => {
  response.status(200).json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  console.log(person)
  if (!person) {
    return response.status(404).json({ error: 'Resource not found' })
  }
  return response.status(200).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))

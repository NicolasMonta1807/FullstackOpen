require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes).end()
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => {
      response.json(result).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.deleteOne({ _id: request.params.id })
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    response.statusMessage = 'error: name or number missing'
    return response.status(400).end()
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(result => response.status(201).json(person).end())
})

const unknownEndpoint = (request, response) => {
  return response.status(404).end()
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on ${PORT}`))

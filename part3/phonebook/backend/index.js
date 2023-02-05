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

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(result => {
      response.json(result).end()
    })
    .catch(error => {
      response.status(404).json({ error: 'id not found' }).end()
    })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.deleteOne({ _id: request.params.id }).then(result =>
    response.status(204).end()
  )
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    response.statusMessage = 'error: name or number missing'
    return response.status(400).end()
  }

  let repeated = null
  Person.findOne({ name: body.name }).then(result => {
    repeated = result
    if (repeated != null) {
      response.statusMessage = 'error: name must be unique'
      return response.status(400).end()
    } else {
      const person = new Person({
        name: body.name,
        number: body.number
      })

      person.save().then(result => response.status(201).end())
    }
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on ${PORT}`))

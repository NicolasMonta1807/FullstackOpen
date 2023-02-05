const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length > 4) {
  console.log('Wrong usage: Too many arguments')
  process.exit(1)
}

if (process.argv.length === 3) {
  console.log('Wrong usage: number or name missing')
  process.exit(1)
}

mongoose.set('strictQuery', true)

const getAll = process.argv.length === 2

const url = process.env.MONGODB_URI

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = new mongoose.model('Person', personSchema)

if (getAll) {
  mongoose
    .connect(url)
    .then(
      Person.find({}).then(result => {
        console.log('phonebook: ')
        result.forEach(person => console.log(person.name, person.number))
        mongoose.connection.close()
        process.exit(0)
      })
    )
    .catch(error => console.log(error))
} else {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  })

  mongoose
    .connect(url)
    .then(result => {
      return person.save()
    })
    .then(() => {
      console.log(
        `added ${person.name} with number ${person.number} to phonebook`
      )
      mongoose.connection.close()
      process.exit(0)
    })
    .catch(error => console.log(error))
}

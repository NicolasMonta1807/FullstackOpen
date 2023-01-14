const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please, provide a password: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length > 5) {
  console.log('Wrong usage: Too many arguments')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Wrong usage: number or name missing')
  process.exit(1)
}

mongoose.set('strictQuery', true)

const getAll = process.argv.length === 3

const password = process.argv[2]

const url = `mongodb+srv://nikoresu-h4cker:${password}@fsopen-course.zn4zgrd.mongodb.net/phonebook?retryWrites=true&w=majority`

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
    name: process.argv[3],
    number: process.argv[4]
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

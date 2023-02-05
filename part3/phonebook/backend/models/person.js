const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(result => console.log('connected to database'))
  .catch(error => console.log(error))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (value) {
        const re = /^\d{2,3}-\d{1,}$/
        return re.test(value)
      },
      message: 'Phone number is not valid'
    },
    required: [true, 'Phone number is required'],
    unique: true
  }
})

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

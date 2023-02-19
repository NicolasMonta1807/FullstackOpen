const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const user = req.body
  const passwordHash = await bcrypt.hash(user.password, 10)
  const userObject = new User({
    username: user.username,
    name: user.name,
    passwordHash
  })

  const savedUser = await userObject.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter

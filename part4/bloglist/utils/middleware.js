const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Request: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({ error: error.message })
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).send({ error: 'token expired' })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    req.token = auth.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  req.user = await User.findById(decodedToken.id)
  next()
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor }

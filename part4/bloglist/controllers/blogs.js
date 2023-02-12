const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
  Blog.find({})
    .then((blogs) => res.json(blogs))
    .catch((error) => console.log(error))
})

blogRouter.post('/', (req, res, next) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then((savedBlog) => res.json(savedBlog))
    .catch((error) => next(error))
})

module.exports = blogRouter

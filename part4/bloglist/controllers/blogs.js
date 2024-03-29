const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 }).populate('comments', { blog: 0 })
  res.json(blogs)
})

blogRouter.get('/:id', async (req, res) => {
  const blogs = await Blog.findById(req.params.id).populate('user', { blogs: 0 }).populate('comments', { blog: 0 })
  res.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (req, res) => {
  const body = req.body
  const user = req.user

  const blogToSave = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blogToSave.save()
  savedBlog.populate('user', { blogs: 0 })

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogRouter.post('/:id/comments', async (req, res) => {
  const { id } = req.params
  const comment = req.body
  const createdComment = await new Comment(comment).save()
  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $push: { comments: createdComment._id } },
    { new: true }
  ).populate('comments', { blog: 0 })
  if (!updatedBlog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  return res.json(updatedBlog)
})

blogRouter.put('/:id', middleware.userExtractor, async (req, res) => {
  const body = req.body

  const blog = {
    likes: body.likes
  }

  const blogUpdated = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true
  }).populate('user', { blogs: 0 }).populate('comments', { blog: 0 })
  res.json(blogUpdated)
})

blogRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== req.user.id) {
    return res.status(401).send({ error: 'user unauthorized' })
  }

  await Blog.findByIdAndDelete(req.params.id)

  const user = req.user
  user.blogs = user.blogs.splice(user.blogs.indexOf(req.param.id), 1)
  await user.save()

  res.status(204).end()
})

module.exports = blogRouter

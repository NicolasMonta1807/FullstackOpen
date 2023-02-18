const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Express good practices',
    author: 'Foo Bar',
    url: 'https://fullstackopen.com/en',
    likes: 100
  },
  {
    title: 'Blog title',
    author: 'Bar Zoo',
    url: 'https://fullstackopen.com/en',
    likes: 150
  },
  {
    title: 'Fullstack development',
    author: 'Bar Zoo',
    url: 'https://fullstackopen.com/en',
    likes: 80
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
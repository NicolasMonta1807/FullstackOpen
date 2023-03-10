const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUsers = [{
  username: 'nikoresu',
  name: 'Nicolás Montañez',
  password: 'Sekretp@ss4321'
},
{
  username: 'standUser',
  name: 'Foo Bar',
  password: 'mypass2023'
}]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { initialBlogs, initialUsers, blogsInDb, usersInDb }

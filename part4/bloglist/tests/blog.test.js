const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

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
    title: 'Facebook sucks',
    author: 'Bar Zoo',
    url: 'https://fullstackopen.com/en',
    likes: 80
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('certain blog is returned', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(initialBlogs[0].title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  await server.close()
})

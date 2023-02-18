const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { app, server } = require('../index')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const savePromises = blogObjects.map(blog => blog.save())
  await Promise.all(savePromises)
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
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('certain blog is returned', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)
    expect(titles).toContain(helper.initialBlogs[0].title)
  })

  test('blog id is defined', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => expect(blog.id).toBeDefined())
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be posted', async () => {
    const blogToSave = {
      title: 'async/await functions',
      author: 'Bar Bar',
      url: 'https://fullstackopen.com/en',
      likes: 86
    }

    await api
      .post('/api/blogs')
      .send(blogToSave)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    const blogTitles = response.map(blog => blog.title)
    expect(blogTitles).toContain(blogToSave.title)
  })

  test('a post posted without likes, would be have default value of 0', async () => {
    const blogToSave = {
      title: 'async/await functions',
      author: 'Bar Bar',
      url: 'https://fullstackopen.com/en'
    }

    await api
      .post('/api/blogs')
      .send(blogToSave)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(response[helper.initialBlogs.length].likes).toBe(0)
  })

  test('a post without title or url cannot be posted', async () => {
    const blogToSave = {
      author: 'Foo Bar',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(blogToSave)
      .expect(400)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

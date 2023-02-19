const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const { app, server } = require('../index')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('blogs testing', () => {
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
})

describe('users testing', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    let passwordHash = await bcrypt.hash('sud0p@ss123', 10)
    let user = new User({
      username: 'root',
      name: 'sudo',
      passwordHash
    })
    await user.save()
    passwordHash = await bcrypt.hash('myp4ss777', 10)
    user = new User({
      username: 'barZoo',
      name: 'Foo Bar',
      passwordHash
    })
    await user.save()
  })

  describe('POST /api/users', () => {
    test('a valid user can be created', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'nikoresu',
        name: 'Nicolás Montañez',
        password: 's3kr3tp@ss'
      }

      await api
        .post('/api/users')
        .send(user)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const currentUsers = await helper.usersInDb()
      expect(currentUsers).toHaveLength(usersAtStart.length + 1)
    })

    test('username must be unique', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'barZoo',
        name: 'fernzing',
        password: 'testpassword'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)

      expect(response.body.error).toContain('expected `username` to be unique')
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('username should have minimum length of 3', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'us',
        name: 'gaproof',
        password: 'marioBr0s64'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)

      expect(response.body.error).toContain('is shorter than the minimum allowed length')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password should have minimum length of 3', async () => {
      const usersAtStart = await helper.usersInDb()

      const user = {
        username: 'auroranew',
        name: 'raspypizza',
        password: 'pw'
      }

      const response = await api
        .post('/api/users')
        .send(user)
        .expect(400)

      expect(response.body.error).toContain('password should have at least 3 characters')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})

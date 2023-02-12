const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach((blog) => {
    total += blog.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  return blogs.find((blog) => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const authors = _.uniq(blogs.map((blog) => blog.author))
  const blogCount = authors.map((author) => {
    const count = blogs.filter((blog) => blog.author === author).length
    return { author, blogs: count }
  })
  const maxBlogs = Math.max(...blogCount.map((author) => author.blogs))
  return blogCount.find((author) => author.blogs === maxBlogs)
}

const mostLikes = (blogs) => {
  const authors = _.uniq(blogs.map((blog) => blog.author))
  const likesCount = authors.map((author) => {
    let count = 0
    blogs.map((blog) => {
      if (blog.author === author) {
        count += blog.likes
      }
    })
    return { author, likes: count }
  })
  const maxLikes = Math.max(...likesCount.map((author) => author.likes))
  return likesCount.find((author) => author.likes === maxLikes)
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

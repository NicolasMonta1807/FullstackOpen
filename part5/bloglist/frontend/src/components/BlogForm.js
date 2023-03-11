import PropTypes from 'prop-types'
import { useState } from "react"

const BlogForm = ({createBlog}) => {

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => { setTitle(target.value) } } />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => { setAuthor(target.value) } } />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => { setUrl(target.value) } } />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
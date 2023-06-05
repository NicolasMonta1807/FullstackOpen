import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      state.push(action.payload)
    },
    updateBlog (state, action) {
      return state.map(blog => (
        blog.id === action.payload.id
          ? action.payload
          : blog
      ))
    },
    deleteBlog (state, action) {
      return state.filter(blog => (
        blog.id !== action.payload.id
      ))
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogsReducer.actions

export const initializeBlogs = () => {
  return async dispatch => {
    dispatch(setBlogs(await blogService.getAll()))
  }
}

export const newBlog = (blog, user) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.post(blog, user)
      dispatch(appendBlog(createdBlog))
    } catch (error) {
      dispatch(setNotification('Invalid Request', 3000))
    }
  }
}

export const likeBlog = (blog, user) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    }, user)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (blog, user) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id, user)
    dispatch(deleteBlog(blog))
  }
}

export default blogsReducer.reducer

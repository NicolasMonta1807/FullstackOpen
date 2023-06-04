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
    }
  }
})

export const { setBlogs, appendBlog } = blogsReducer.actions

export const initializeBlogs = (blogs) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
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

export default blogsReducer.reducer

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload
    }
  }
})

export const { setBlogs } = blogsReducer.actions

export const initializeBlogs = (blogs) => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsReducer.reducer

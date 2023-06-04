import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'
import blogsReducer from './blogsReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogsReducer
  }
})

export default store

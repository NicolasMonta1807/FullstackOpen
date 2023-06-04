import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import userReducer from './userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer
  }
})

export default store

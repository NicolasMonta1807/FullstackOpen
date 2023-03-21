import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: 'Initial notification',
  reducers: {
    changeMessage (state, action) {
      return action.payload
    }
  }
})

export const { changeMessage } = notificationReducer.actions
export default notificationReducer.reducer

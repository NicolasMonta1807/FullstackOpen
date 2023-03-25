import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeMessage (state, action) {
      return action.payload
    },
    clearMessage (state, action) {
      return ''
    }
  }
})

export const { changeMessage, clearMessage } = notificationReducer.actions

export const setNotification = (text, timeout) => {
  return dispatch => {
    dispatch(changeMessage(text))
    setTimeout(() => dispatch(clearMessage()), timeout * 1000)
  }
}

export default notificationReducer.reducer

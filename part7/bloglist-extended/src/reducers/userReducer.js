import { createSlice } from '@reduxjs/toolkit'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser (state, action) {
      return action.payload
    },
    clearUser (state, action) {
      return null
    }
  }
})

export const { setUser, clearUser } = userReducer.actions

export const loginUser = (user) => {
  return dispatch => {
    dispatch(setUser(user))
  }
}

export default userReducer.reducer

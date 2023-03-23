import { createSlice } from '@reduxjs/toolkit'

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote (state, action) {
      return state.map(anecdote => (
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      ))
    },
    createAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteReducer.actions
export default anecdoteReducer.reducer

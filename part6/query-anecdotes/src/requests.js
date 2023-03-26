import axios from 'axios'

const baseUrl = 'http://localhost:8080/anecdotes'

export const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const createAnecdote = async (newAnecdote) => {
  const { data } = await axios.post(baseUrl, newAnecdote)
  return data
}

export const updateAnecdote = async (updatedAnecdote) => {
  const { data } = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return data
}

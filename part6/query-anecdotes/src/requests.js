import axios from 'axios'

const baseUrl = 'http://localhost:8080/anecdotes'

export const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

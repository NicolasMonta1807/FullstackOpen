import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const post = (blog, user) => {
  const request = axios.post(baseUrl, blog, {
    headers: { Authorization: `Bearer ${user.token}` }
  })
  return request.then(response => response.data)
}

const update = async (id, newBlog, user) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog, {
    headers: { Authorization: `Bearer ${user.token}` }
  })
  return response.data
}

const deleteBlog = async (blogId, user) => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, {
    headers: { Authorization: `Bearer ${user.token}` }
  })
  return response.data
}

const postComment = async (blogId, comment) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, {
    content: comment
  })
  return response.data
}

export default { getAll, getById, post, update, deleteBlog, postComment }

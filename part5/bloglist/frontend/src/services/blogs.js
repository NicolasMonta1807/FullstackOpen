import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = ({blog, user}) => {
  const request =  axios.post(baseUrl, blog, {headers: {'Authorization': `Bearer ${user.token}`}})
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, post }
import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newPerson =>
  axios.post(baseUrl, newPerson).then(response => response.data)

const update = newPerson =>
  axios
    .put(`${baseUrl}/${newPerson.id}`, newPerson)
    .then(response => response.data)

const remove = id => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }

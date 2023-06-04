import { useEffect, useState } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetch = async () => {
      setUsers(await userService.getAll())
    }
    fetch()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs posted</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <th>{user.username}</th>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Users

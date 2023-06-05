import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { useEffect, useState } from 'react'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await userService.getById(id))
    }
    fetchUser()
  }, [id])

  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>{user.username}</h2>
      {user.blogs.length !== 0
        ? (
          <>
            <h3>Added blogs: </h3>
            <ul>
              {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
          </>
          )
        : (
          <h3>This user hasn't posted anything yet</h3>
          )}
    </div>
  )
}

export default User

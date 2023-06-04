import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      navigate('/')
      dispatch(setNotification('Login successful', 3000))
    } catch (exception) {
      dispatch(setNotification('Wrong Credentials', 3000))
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
            id='password'
          />
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm

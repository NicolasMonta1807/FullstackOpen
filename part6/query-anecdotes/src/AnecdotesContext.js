import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

const AnecdoteContext = createContext('')

export const AnecdoteProvider = (props) => {
  const [message, dispatch] = useReducer(notificationReducer, '')

  return (
    <AnecdoteContext.Provider value={[message, dispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export const useMessageValue = () => {
  const value = useContext(AnecdoteContext)
  return value[0]
}

export const useDispatchValue = () => {
  const value = useContext(AnecdoteContext)
  return value[1]
}

export default AnecdoteContext

import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({ notification }) => notification)

  if (message === null) {
    return null
  }
  return (
    <div>
      <h2 className='notification'>{message}</h2>
    </div>
  )
}

export default Notification

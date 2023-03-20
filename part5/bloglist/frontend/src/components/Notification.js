const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      <h1 className={error ? 'error' : 'notification'}>{message}</h1>
    </div>
  )
}

export default Notification
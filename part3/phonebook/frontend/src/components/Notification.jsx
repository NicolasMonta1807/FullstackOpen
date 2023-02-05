const Notification = ({ message }) => {
  if (!message) {
    return null
  } else {
    return (
      <div className={`notification ${message.error ? 'error' : ''}`}>
        {message.content}
      </div>
    )
  }
}

export default Notification

const Notification = ({message, error}) => {
  if (message === null) {
    return null
  }
  return (
    <div>
      <h1 className={error ? "error" : ""}>{message}</h1>
    </div>
  )
}

export default Notification
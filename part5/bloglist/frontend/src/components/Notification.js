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

// eslint-disable-next-line import/no-anonymous-default-export
export default Notification
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool.isRequired
}

export default Notification

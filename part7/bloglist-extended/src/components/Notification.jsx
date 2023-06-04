import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = ({ error }) => {
  const message = useSelector(({ notification }) => notification)

  if (message === null) {
    return null
  }
  return (
    <div>
      <h2 className={error ? 'error' : 'notification'}>{message}</h2>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool.isRequired
}

export default Notification

import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({ redirectPath, children }) => {
  const user = useSelector(({ user }) => user)
  if (!user) {
    return <Navigate to={redirectPath} />
  }
  return children
}

Protected.propTypes = {
  redirectPath: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Protected

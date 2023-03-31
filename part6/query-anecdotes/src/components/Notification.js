import { useMessageValue } from '../AnecdotesContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const message = useMessageValue()

  return message === ''
    ? null
    : <div style={style}>{message}</div>
}

export default Notification

import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value))
  }

  return (
    <div>
      Filter:
      <input name='filter' type='text' onChange={handleChange} />
    </div>
  )
}

export default Filter

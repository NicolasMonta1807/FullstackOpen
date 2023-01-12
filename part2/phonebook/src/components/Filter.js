const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <label htmlFor='filter'>Search by name: </label>
      <input type='text' value={filter} onChange={handleFilter} />
    </div>
  )
}

export default Filter

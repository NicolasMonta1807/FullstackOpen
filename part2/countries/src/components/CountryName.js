const CountryName = ({ name, buttonHandler }) => {

  const handleClick = () => buttonHandler(name)

  return (
    <>
      <p>
        {name}
        <button onClick={handleClick}>Show</button>
      </p>
    </>
  )
}

export default CountryName

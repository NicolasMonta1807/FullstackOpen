import { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {

  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => setFilter(event.target.value)

  const countriesToShow = () => (
    countries.filter((country) => (
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    ))
  )

  return (
    <>
      <label htmlFor="filter">Find countries: </label>
      <input
        type="text"
        value={filter}
        placeholder="Country name..."
        onChange={handleFilterChange}
      />
      <Countries countriesList={countriesToShow()} />
    </>
  );
}

export default App;

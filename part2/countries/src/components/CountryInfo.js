const CountryInfo = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt="Colombian flag" />
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} square kilometers</p>
      <strong>Languages: </strong>
      <ul>
        {Object
          .values(country.languages)
          .map((lang, index) => (<li key={index}>{lang}</li>))}
      </ul>
    </>
  )
}

export default CountryInfo
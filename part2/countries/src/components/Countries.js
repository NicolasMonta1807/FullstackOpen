import CountryInfo from "./CountryInfo"
import CountryName from "./CountryName"

const Countries = ({ countriesList }) => {

  const countryFound = countriesList.length === 1
  const countriesLimit = countriesList.length > 10

  return (
    <>
      {
        countryFound
          ? <CountryInfo country={countriesList[0]} />
          : countriesLimit
            ? <p>Too many matches, specify another filter</p>
            : countriesList.map((country) =>
            (<CountryName key={country.cca2} name={country.name.common} />
            ))
      }
    </>
  )
}

export default Countries
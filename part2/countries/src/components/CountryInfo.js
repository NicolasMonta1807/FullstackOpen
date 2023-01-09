import { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from "./Weather"

const CountryInfo = ({ country }) => {
  const [lat, lon] = country.capitalInfo.latlng

  return (
    <>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.demonyms.eng.f + " flag"} />
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} square kilometers</p>
      <strong>Languages: </strong>
      <ul>
        {Object
          .values(country.languages)
          .map((lang, index) => (<li key={index}>{lang}</li>))}
      </ul>
      <Weather lat={lat} lon={lon} capitalName={country.capital[0]} />
    </>
  )
}

export default CountryInfo
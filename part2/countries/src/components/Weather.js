import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capitalName, lat, lon }) => {
  const [data, setData] = useState(null)

  const API_KEY = process.env.REACT_APP_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data)
      })
  }, [])

  if (!data) {
    console.log("fetching data...")
    return null
  }

  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

  const mainDesc = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1)

  return (
    <>
      <h3>Weather in {capitalName}</h3>
      <p>Main: {mainDesc} </p>
      <img src={iconUrl} alt={mainDesc} />
      <p>Current temperature: {data.main.temp}°</p>
      <p>Wind speed: {data.wind.speed} m/s</p>
    </>
  );
}

export default Weather
import { useState } from 'react'
import './App.css'
import Input from './components/ui/Input/Input.tsx';
import Button from './components/ui/Button/Button.tsx';
import WeatherCard from './components/WeatherCard/WeatherCard.tsx';
import CardLine from './components/CardLine/CardLine.tsx';

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();

async function getWeather() {
  const geocodingResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=ru&format=json`
  )

  const geocodingData = await geocodingResponse.json()

  const latitude = geocodingData.results[0].latitude
  const longitude = geocodingData.results[0].longitude

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`
  )

  const weatherData = await weatherResponse.json()

  setData(weatherData);
}

  return (
    <>
    <Input value={city} onChange={(e) => setCity(e.target.value)} />
   
    Вы ввели {city}

    <Button text='Поиск' onClick={getWeather}> 
      
    </Button>

    <h6>
      {JSON.stringify(data, null, 2)}
    </h6>

    <CardLine></CardLine>
    </>
  )
}

export default App

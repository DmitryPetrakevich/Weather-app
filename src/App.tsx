import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { fetchWeather, clearWeather } from './store/weatherSlice'
import WeatherCard from './components/WeatherCard/WeatherCard'
import PageHeader from './components/PageHeader/PageHeader'

function App() {
  const [cityInput, setCityInput] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const { city, dataByDate, loading, error } = useSelector(
    (state: RootState) => state.weather
  )

  const handleSearch = () => {
    if (!cityInput.trim()) return
    dispatch(fetchWeather(cityInput.trim()))
  }

  const handleClear = () => {
    dispatch(clearWeather())
  }

  return (
    <div className="app">
      <PageHeader></PageHeader>

      <input
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        placeholder="Введите город"
      />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Загрузка...' : 'Поиск'}
      </button>

      <button onClick={handleClear}>Очистить</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {city && <h2>{city}</h2>}

      {Object.entries(dataByDate).map(([date, day]) => {
        const hoursEvery3h = day.hours.filter((hour) => {
          const hourNumber = new Date(hour.time).getHours()
          return hourNumber % 3 === 0
        })

        return (
          <div key={date}>
            {/* Сводка за день */}
            <h3>{date}</h3>
            <div>Макс. температура: {day.tempMax}°</div>
            <div>Мин. температура: {day.tempMin}°</div>
            <div>Осадки за день: {day.precipitationSum} мм</div>
            <div>Макс. вероятность дождя: {day.precipitationProbabilityMax}%</div>
            <div>Макс. ветер: {day.windSpeedMax} км/ч</div>

            {/* Часы (каждые 3 часа) */}
            <div>
              <strong>По часам:</strong>
              {hoursEvery3h.map((hour) => {
                const time = hour.time.split('T')[1] // "09:00"

                return (
                  <div key={hour.time}>
                    {/* <div><strong>{time}</strong></div>
                    <div>Температура: {hour.temperature}°</div>
                    <div>Ощущается: {hour.apparentTemperature}°</div>
                    <div>Облачность: {hour.cloudCover}%</div>
                    <div>Вероятность дождя: {hour.precipitationProbability}%</div>
                    <div>Осадки: {hour.precipitation} мм</div>
                    <div>Дождь: {hour.rain} мм</div>
                    <div>Влажность: {hour.humidity}%</div>
                    <div>Ветер: {hour.windSpeed} км/ч</div>
                    <div>Направление ветра: {hour.windDirection}°</div>
                    <div>Код погоды: {hour.weatherCode}</div> */}
                    <WeatherCard 
                    temperature={hour.temperature} 
                    weatherCode={hour.weatherCode} 
                    tempMin={day.tempMin}
                    tempMax={day.tempMax}
                    date={date}
                    />
                  </div>

                  
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default App
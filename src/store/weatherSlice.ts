import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Данные за один час
interface WeatherHour {
  time: string                // "2026-08-19T09:00"
  temperature: number
  apparentTemperature: number
  humidity: number
  precipitationProbability: number  // вероятность дождя %
  precipitation: number             // осадки мм
  rain: number
  cloudCover: number                // облачность %
  windSpeed: number
  windDirection: number
  weatherCode: number
}

interface WeatherDay {
  date: string
  tempMax: number
  tempMin: number
  precipitationSum: number
  precipitationProbabilityMax: number
  windSpeedMax: number
  hours: WeatherHour[]         // все часы этого дня
}

interface WeatherState {
  city: string
  // ключ — дата в формате "2026-08-19"
  dataByDate: Record<string, WeatherDay>
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  city: '',
  dataByDate: {},
  loading: false,
  error: null,
}

// Асинхронный запрос (thunk)
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      // 1. Геокодинг (Nominatim)
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&accept-language=ru`,
        { headers: { 'User-Agent': 'WeatherApp/1.0' } }
      )
      const geoData = await geoRes.json()

      if (!geoData || geoData.length === 0) {
        return rejectWithValue('Город не найден')
      }

      const { lat, lon } = geoData[0]

      // 2. Погода (Open-Meteo) — пример на несколько дней
        const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
        `&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,rain,cloud_cover,wind_speed_10m,wind_direction_10m,weather_code` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max` +
        `&timezone=auto&forecast_days=7`
        )
      const weatherData = await weatherRes.json()

      return {
        city: geoData[0].display_name,
        weatherData,
      }
    } catch (err) {
      return rejectWithValue('Ошибка при запросе')
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.dataByDate = {}
      state.city = ''
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false
        state.city = action.payload.city

        const { hourly, daily } = action.payload.weatherData

        const newData: Record<string, WeatherDay> = {}

        // Сначала создаём дни из daily
        daily.time.forEach((date: string, index: number) => {
            newData[date] = {
            date,
            tempMax: daily.temperature_2m_max[index],
            tempMin: daily.temperature_2m_min[index],
            precipitationSum: daily.precipitation_sum[index],
            precipitationProbabilityMax: daily.precipitation_probability_max[index],
            windSpeedMax: daily.wind_speed_10m_max[index],
            hours: [],
            }
        })

        // Теперь раскладываем часы по дням
        hourly.time.forEach((time: string, index: number) => {
            const date = time.split('T')[0] // "2026-08-19T09:00" → "2026-08-19"

            if (newData[date]) {
            newData[date].hours.push({
                time,
                temperature: hourly.temperature_2m[index],
                apparentTemperature: hourly.apparent_temperature[index],
                humidity: hourly.relative_humidity_2m[index],
                precipitationProbability: hourly.precipitation_probability[index],
                precipitation: hourly.precipitation[index],
                rain: hourly.rain[index],
                cloudCover: hourly.cloud_cover[index],
                windSpeed: hourly.wind_speed_10m[index],
                windDirection: hourly.wind_direction_10m[index],
                weatherCode: hourly.weather_code[index],
            })
            }
        })

        state.dataByDate = newData
        })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearWeather } = weatherSlice.actions
export default weatherSlice.reducer
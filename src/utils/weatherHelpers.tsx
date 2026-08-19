type WeatherInfo = {
  description: string
  icon: string
}

export const getWeatherInfo = (code: number | string): WeatherInfo => {
  const weatherMap: Record<number, WeatherInfo> = {
    0: { description: 'Ясно', icon: 'clear' },
    1: { description: 'Малооблачно', icon: 'partly-cloudy' },
    2: { description: 'Переменная облачность', icon: 'partly-cloudy' },
    3: { description: 'Пасмурно', icon: 'cloudy' },

    45: { description: 'Туман', icon: 'fog' },
    48: { description: 'Туман', icon: 'fog' },

    51: { description: 'Небольшой дождь', icon: 'light-rain' },
    53: { description: 'Дождь', icon: 'rain' },
    55: { description: 'Сильный дождь', icon: 'rain' },
    56: { description: 'Небольшой дождь', icon: 'light-rain' },
    57: { description: 'Дождь', icon: 'rain' },

    61: { description: 'Небольшой дождь', icon: 'light-rain' },
    63: { description: 'Дождь', icon: 'rain' },
    65: { description: 'Сильный дождь', icon: 'rain' },
    66: { description: 'Небольшой дождь', icon: 'light-rain' },
    67: { description: 'Сильный дождь', icon: 'rain' },

    71: { description: 'Небольшой снег', icon: 'light-snow' },
    73: { description: 'Снег', icon: 'light-snow' },
    75: { description: 'Сильный снег', icon: 'heavy-snow' },
    77: { description: 'Снег', icon: 'light-snow' },

    80: { description: 'Небольшой дождь', icon: 'light-rain' },
    81: { description: 'Дождь', icon: 'rain' },
    82: { description: 'Сильный дождь', icon: 'rain' },

    85: { description: 'Небольшой снег', icon: 'light-snow' },
    86: { description: 'Сильный снег', icon: 'heavy-snow' },

    95: { description: 'Гроза', icon: 'thunderstorm' },
    96: { description: 'Гроза', icon: 'thunderstorm' },
    99: { description: 'Гроза', icon: 'thunderstorm' },
  }

  const numericCode = typeof code === 'string' ? Number(code) : code

  return weatherMap[numericCode] ?? {
    description: 'Нет данных',
    icon: 'cloudy',
  }
}
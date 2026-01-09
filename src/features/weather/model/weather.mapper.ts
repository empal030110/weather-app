import type { OpenWeatherResponse, Weather } from './weather.types'

export function mapWeather(res: OpenWeatherResponse): Weather {
  const weather = res.weather[0];

  return {
    city: res.name,
    weatherMain: weather.main,
    icon: weather.icon,
    description: weather.description,
    temp: res.main.temp,
    feelsLike: res.main.feels_like,
    tempMin: res.main.temp_min,
    tempMax: res.main.temp_max,
    humidity: res.main.humidity,
    pressure: res.main.pressure,
  };
}

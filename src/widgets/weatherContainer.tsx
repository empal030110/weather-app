import type { Weather } from '@/features/weather/model/weather.types'
import { WeatherCard } from '@/shared/ui/weatherCard'

type Props = {
  weather: Weather;
};

export function WeatherContainer({ weather }: Props) {
  return (
    <div className="w-full h-auto">
      <div className='font-bold text-[24px] flex items-center justify-center'>{weather.city}</div>
      <div className='flex items-center justify-center gap-[4px] my-[12px]'>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={`${weather.weatherMain}`} />
        <div>
          <p className='font-bold text-[24px] text-center'>{weather.temp}°</p>
          <p className='text-[14px] text-gray-400'>{weather.description}</p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-[12px] mb-[20px] pc:flex-row'>
        <WeatherCard temperatureName='최저 기온' temperature={weather.tempMin} />
        <WeatherCard temperatureName='최고 기온' temperature={weather.tempMax} />
        <WeatherCard temperatureName='체감 기온' temperature={weather.feelsLike} />
      </div>
    </div>
  );
}

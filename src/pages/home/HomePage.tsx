import { ContantsContainer } from "@/shared/ui/contantsContainer"
import { WeatherContainer } from "@/widgets/weatherContainer"

import { useEffect, useState } from 'react'
import { useCurrentLocation } from '@/features/detectLocation'
import { getWeather } from '@/features/weather/api/getWeather'
import type { Weather } from "@/features/weather/model/weather.types"

export function HomePage() {
  const { location, loading, error } = useCurrentLocation();
  const [weather, setWeather] = useState<Weather | null>(null);

    useEffect(() => {
    if (!location) return;

    getWeather(location.lat, location.lon)
    .then(setWeather)
    .catch(console.error);
    }, [location]);

  if (loading) return <div>위치 확인 중...</div>;
  if (error) return <div>{error}</div>;
  if (!weather) return null;

  return (
    <ContantsContainer>
      <WeatherContainer weather={weather} />
    </ContantsContainer>
  )
}
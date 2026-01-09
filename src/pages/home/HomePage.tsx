import { ContantsContainer } from "@/shared/ui/contantsContainer"

import { useEffect, useState } from 'react'
import { useCurrentLocation } from '@/features/detectLocation'
import { getWeather } from '@/features/weather/api/getWeather'

export function HomePage() {
  const { location, loading, error } = useCurrentLocation();
  const [weather, setWeather] = useState(null);

    useEffect(() => {
    if (!location) return;

    getWeather(location.lat, location.lon)
    .then(setWeather)
    .catch(console.error);
    }, [location]);

  if (loading) return <div>위치 확인 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ContantsContainer>
      <div>
        <h1>현재 위치 날씨</h1>
        {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
      </div>
    </ContantsContainer>
  )
}
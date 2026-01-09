import { ContantsContainer } from "@/shared/ui/contantsContainer"
import { WeatherContainer } from "@/widgets/weatherContainer"

import { useWeatherQuery } from '@/features/weather/model/useWeatherQuery'
import { useCurrentLocation } from '@/features/detectLocation'

export function HomePage() {
  const { location, loading: locationLoading, error: locationError } = useCurrentLocation();

  const { data: weather, isLoading, error } = useWeatherQuery(location?.lat, location?.lon);

  if (locationLoading) return <div>위치 확인 중...</div>;
  if (locationError) return <div>{locationError}</div>;
  if (isLoading) return <div>날씨 불러오는 중...</div>;
  if (error || !weather) return <div>날씨 에러</div>;

  return (
    <ContantsContainer>
      <WeatherContainer weather={weather} />
    </ContantsContainer>
  )
}
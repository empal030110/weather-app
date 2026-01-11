import { useState } from 'react'
import { SearchPanel } from '@/widgets/searchPanel'
import { getCoordinates } from '@/features/geocoding'
import { useWeatherQuery } from '@/features/weather/model/useWeatherQuery'
import { WeatherContainer } from '@/widgets/weatherContainer'
import { ContantsContainer } from '@/shared/ui/contantsContainer'

export function SearchPage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);

  const { data: weather, isLoading, error } = useWeatherQuery(coords);

  const handleSelectRegion = async (region: string) => {
    const coordinates = await getCoordinates(region);
    setCoords(coordinates);
  };

  return (
    <ContantsContainer>
      <SearchPanel onSelectRegion={handleSelectRegion} />

      {isLoading && <div>날씨 불러오는 중...</div>}
      {error && <div>에러 발생</div>}
      {weather && <WeatherContainer weather={weather} />}
    </ContantsContainer>
  );
}
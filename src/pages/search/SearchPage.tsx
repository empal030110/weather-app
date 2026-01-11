import { useState } from 'react'
import { SearchPanel } from '@/widgets/searchPanel'
import { getCoordinates } from '@/features/geocoding'
import { useWeatherQuery } from '@/features/weather/model/useWeatherQuery'
import { WeatherContainer } from '@/widgets/weatherContainer'
import { ContantsContainer } from '@/shared/ui/contantsContainer'

export function SearchPage() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchRegion, setSearchRegion] = useState<string | null>(null);

  const { data: weather, isLoading, error } = useWeatherQuery(coords);

  const handleSelectRegion = async (region: string) => {
    try {
      setSearchError(null);
      setSearchRegion(region); // 검색한 지역명 저장
      const coordinates = await getCoordinates(region);
      setCoords(coordinates);
    } catch (error) {
      console.error('검색 오류:', error);
      setSearchError(error instanceof Error ? error.message : '검색 중 오류가 발생했습니다.');
      setCoords(null);
      setSearchRegion(null);
    }
  };

  return (
    <ContantsContainer>
      <SearchPanel onSelectRegion={handleSelectRegion} />

      {searchError && (
        <div className="mt-[16px] p-[16px] border border-red-300 rounded-[4px] bg-red-50 text-red-700 text-center">
          {searchError}
        </div>
      )}

      {isLoading && <div className="mt-[16px] text-center">날씨 불러오는 중...</div>}
      {error && !searchError && <div className="mt-[16px] text-center text-red-700">날씨 정보를 가져오는 중 오류가 발생했습니다.</div>}
      {weather && <WeatherContainer weather={weather} regionName={searchRegion} />}
    </ContantsContainer>
  );
}
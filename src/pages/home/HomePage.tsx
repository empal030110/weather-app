import { useState, useEffect } from "react"
import { ContantsContainer } from "@/shared/ui/contantsContainer"
import { WeatherContainer } from "@/widgets/weatherContainer"

import { useWeatherQuery } from '@/features/weather/model/useWeatherQuery'
import { useCurrentLocation } from '@/features/detectLocation'
import { getAddressFromCoordinates } from '@/features/geocoding'

export function HomePage() {
  const { location, loading: locationLoading, error: locationError } = useCurrentLocation();
  const [koreanAddress, setKoreanAddress] = useState<string | null>(null);

  const { data: weather, isLoading, error } = useWeatherQuery(
    location ? { lat: location.lat, lon: location.lon } : null
  );

  // 좌표로부터 한국어 주소 가져오기
  useEffect(() => {
    if (location) {
      getAddressFromCoordinates(location.lat, location.lon)
        .then(address => {
          setKoreanAddress(address);
        })
        .catch(err => {
          console.error('주소 변환 실패:', err);
          // 실패해도 계속 진행 (영어 주소 사용)
        });
    }
  }, [location]);

  if (locationLoading) return <div>위치 확인 중...</div>;
  if (locationError) return <div>{locationError}</div>;
  if (isLoading) return <div>날씨 불러오는 중...</div>;
  if (error || !weather) return <div>날씨 에러</div>;

  return (
    <ContantsContainer>
      <WeatherContainer weather={weather} regionName={koreanAddress} />
    </ContantsContainer>
  )
}
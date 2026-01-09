import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../api/getWeather';

export function useWeatherQuery(lat?: number, lon?: number) {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => {
      if (lat == null || lon == null) {
        throw new Error('위치 정보가 없습니다.');
      }
      return getWeather(lat, lon);
    },
    enabled: lat != null && lon != null,
  });
}

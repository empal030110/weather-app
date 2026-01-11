import { useQuery } from '@tanstack/react-query';
import { getWeather } from '../api/getWeather';

export function useWeatherQuery( coords: { lat: number; lon: number } | null ) {
  return useQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather(coords!.lat, coords!.lon),
    enabled: !!coords,
  });
}
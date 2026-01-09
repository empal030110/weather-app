import { useEffect, useRef, useState } from 'react';

type Location = {
  lat: number;
  lon: number;
};

export function useCurrentLocation() {
  const initializedRef = useRef(false);

  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initializedRef.current) return; // effect 2번 실행 방지
    initializedRef.current = true;

    if (!navigator.geolocation) {
      setError('위치 정보를 지원하지 않습니다.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError('위치 접근이 거부되었습니다.');
        setLoading(false);
      }
    );
  }, []);

  return { location, error, loading };
}

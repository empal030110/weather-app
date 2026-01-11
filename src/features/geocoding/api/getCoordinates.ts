export type Coordinates = {
  lat: number;
  lon: number;
};

export async function getCoordinates(region: string): Promise<Coordinates> {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      region.replaceAll('-', ' ')
    )}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
  );

  if (!res.ok) {
    throw new Error('좌표를 가져오지 못했습니다.');
  }

  const data = await res.json();

  if (!data[0]) {
    throw new Error('검색 결과가 없습니다.');
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
  };
}

export async function getWeather(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
  );

  if (!res.ok) {
    throw new Error('날씨 정보를 가져오지 못했습니다.');
  }

  return res.json();
}

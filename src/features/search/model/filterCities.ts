export function filterCities(keyword: string, cities: string[]) {
  if (!keyword.trim()) return [];

  return cities.filter(city =>
    city.includes(keyword)
  );
}
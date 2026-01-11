export type Coordinates = {
  lat: number;
  lon: number;
};

async function searchNominatim(query: string): Promise<any[]> {
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&limit=1`;
  
  // CORS 프록시를 통해 요청
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(nominatimUrl)}`;
  
  const res = await fetch(proxyUrl, {
    headers: {
      'User-Agent': 'WeatherApp/1.0',
    },
  });

  if (!res.ok) {
    throw new Error('좌표를 가져오지 못했습니다.');
  }

  const proxyData = await res.json();
  
  try {
    return JSON.parse(proxyData.contents);
  } catch (e) {
    throw new Error('좌표를 가져오지 못했습니다.');
  }
}

export async function getCoordinates(region: string): Promise<Coordinates> {
  // 하이픈으로 구분된 지역명 파싱
  const parts = region.split('-');
  
  // 단계적으로 검색 시도: 전체 주소 -> 구 단위 -> 시 단위
  const searchQueries: string[] = [];
  
  if (parts.length >= 3) {
    // 시-구-동 형식인 경우
    searchQueries.push(parts.join(' ')); // 전체 주소
    searchQueries.push(parts.slice(0, 2).join(' ')); // 시-구
    searchQueries.push(parts[0]); // 시
  } else if (parts.length === 2) {
    // 시-구 형식인 경우
    searchQueries.push(parts.join(' ')); // 전체 주소
    searchQueries.push(parts[0]); // 시
  } else {
    // 시 단위만 있는 경우
    searchQueries.push(parts[0]);
  }
  
  // 각 검색어로 순차적으로 시도
  for (const query of searchQueries) {
    try {
      const data = await searchNominatim(query);
      
      if (data && data.length > 0 && data[0]) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      }
    } catch (error) {
      // 다음 검색어로 시도
      continue;
    }
  }
  
  // 모든 검색어로 실패한 경우
  throw new Error('검색 결과가 없습니다.');
}

export type Coordinates = {
  lat: number;
  lon: number;
};

// 좌표로부터 주소를 가져오는 역지오코딩 함수
export async function getAddressFromCoordinates(lat: number, lon: number): Promise<string> {
  const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=ko`;
  
  // CORS 프록시를 통해 요청
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(nominatimUrl)}`;
  
  const res = await fetch(proxyUrl, {
    headers: {
      'User-Agent': 'WeatherApp/1.0',
    },
  });

  if (!res.ok) {
    throw new Error('주소를 가져오지 못했습니다.');
  }

  const proxyData = await res.json();
  
  try {
    const data = JSON.parse(proxyData.contents);
    
    if (!data || !data.address) {
      throw new Error('주소 정보를 찾을 수 없습니다.');
    }

    // 한국어 주소 구성 (시/도, 시/군/구, 동/면/리)
    const address = data.address;
    const parts: string[] = [];
    
    // 시/도
    if (address.state || address.province) {
      parts.push(address.state || address.province);
    }
    
    // 시/군/구
    if (address.city || address.county) {
      parts.push(address.city || address.county);
    }
    
    // 동/면/리
    if (address.neighbourhood || address.village || address.town) {
      parts.push(address.neighbourhood || address.village || address.town);
    }
    
    // 주소가 있으면 반환, 없으면 display_name 사용
    if (parts.length > 0) {
      return parts.join(' ');
    }
    
    // 한국어 부분 추출
    if (data.display_name) {
      const displayName = data.display_name;
      const koreanMatch = displayName.match(/[가-힣\s]+/);
      if (koreanMatch) {
        return koreanMatch[0].trim();
      }
      return displayName;
    }
    
    throw new Error('주소 정보를 찾을 수 없습니다.');
  } catch (e) {
    throw new Error('주소를 가져오지 못했습니다.');
  }
}

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

import { useMemo } from 'react'
import cities from '../data/korea_districts.json'
import { filterCities } from './filterCities'

export function useAutoComplete(keyword: string) {
  return useMemo(() => {
    if (keyword.length < 2) return [];
    return filterCities(keyword, cities);
  }, [keyword]);
}
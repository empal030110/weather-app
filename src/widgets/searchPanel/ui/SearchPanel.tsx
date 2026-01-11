import { useState, useCallback } from 'react'
import { useAutoComplete } from '@/features/search'
import { AutoCompleteList } from './AutoCompleteList'
import { SearchInput } from '@/features/search/ui/SearchInput'

type Props = {
  onSelectRegion: (region: string) => void;
};

export function SearchPanel({ onSelectRegion }: Props) {
  const [keyword, setKeyword] = useState('');
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const results = useAutoComplete(keyword);

  const handleSelect = useCallback((value: string) => {
    setKeyword(value);
    setIsSearchCompleted(true);
    onSelectRegion(value);
  }, [onSelectRegion]);

  const handleEnter = useCallback((value: string) => {
    if (results.length > 0) {
      handleSelect(results[0]);
    } else if (value.trim()) {
      setIsSearchCompleted(true);
      onSelectRegion(value.trim());
    }
  }, [results, onSelectRegion, handleSelect]);

  const handleChange = useCallback((value: string) => {
    setKeyword(value);
    setIsSearchCompleted(false);
  }, []);

  return (
    <div className="relative">
      <SearchInput value={keyword} onChange={handleChange} onEnter={handleEnter} />
      {!isSearchCompleted && <AutoCompleteList items={results} onSelect={handleSelect} />}
    </div>
  );
}
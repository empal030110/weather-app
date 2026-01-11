type Props = {
  value: string;
  onChange: (value: string) => void;
  onEnter?: (value: string) => void;
};

export function SearchInput({ value, onChange, onEnter }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onEnter?.(value.trim());
    }
  };

  return (
    <input
      className="w-full p-[8px] border rounded-[4px] mb-[24px]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="지역 검색"
    />
  );
}
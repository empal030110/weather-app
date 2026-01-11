import { AutoCompleteItem } from './AutoCompleteItem'

type Props = {
  items: string[];
  onSelect: (value: string) => void;
};

export function AutoCompleteList({ items, onSelect }: Props) {
  if (items.length === 0) return null;

  return (
    <ul className="border rounded-[4px] mt-[8px] h-[200px] overflow-y-auto">
      {items.map(item => (
        <AutoCompleteItem
          key={item}
          text={item}
          onClick={() => onSelect(item)}
        />
      ))}
    </ul>
  );
}
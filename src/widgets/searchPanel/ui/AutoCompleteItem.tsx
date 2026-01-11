type Props = {
  text: string;
  onClick: () => void;
};

export function AutoCompleteItem({ text, onClick }: Props) {
  return (
    <li className="p-[8px] hover:bg-gray-100 cursor-pointer" onClick={onClick}>
      {text}
    </li>
  );
}
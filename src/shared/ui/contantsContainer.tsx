export function ContantsContainer({ children }: { children: React.ReactNode; }) {
  return (
    <div className="w-full h-[calc(100%-32px)] bg-sky-50 p-[20px] overflow-y-auto pc:h-full">
      {children}
    </div>
  );
}

export function PageContainer({ children }: { children: React.ReactNode; }) {
  return (
    <div className="w-full h-full max-w-[940px] m-auto p-[20px] flex gap-[20px]">
      {children}
    </div>
  );
}

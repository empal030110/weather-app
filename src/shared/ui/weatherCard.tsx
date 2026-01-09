type Props = {
  temperatureName: string;
  temperature: number;
};

export function WeatherCard({ temperature, temperatureName }: Props) {
  return (
    <div className="bg-white p-[12px] w-full rounded-[12px] border border-gray-300 pc:max-w-[200px]">
        <div className="flex items-center gap-[4px] text-gray-500 mb-[8px]">
            <p className="text-[14px]">{temperatureName}</p>
        </div>
        <p className="font-bold text-[20px]">{temperature}°</p>
    </div>
  );
}

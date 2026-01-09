export type OpenWeatherResponse = {
  name: string;
  weather: {
    main: string;
    icon: string;
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
};

export type Weather = {
  city: string;
  weatherMain: string;
  icon:string;
  description: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  pressure: number;
};


export interface WeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
    localtime_epoch: number;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    uv: number;
    dewpoint_c: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    air_quality: {
      co: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      'us-epa-index': number;
    };
  };
  forecast: {
    forecastday: Array<{
      hour: Array<{
        time: string;
        time_epoch: number;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        is_day: number;
      }>;
    }>;
  };
}

export type WeatherCondition = 
  | 'sunny' 
  | 'clear' 
  | 'cloudy' 
  | 'overcast' 
  | 'rain' 
  | 'snow' 
  | 'thunder' 
  | 'mist' 
  | 'fog';

export interface AQILevel {
  level: number;
  label: string;
  color: string;
}

export interface UVLevel {
  level: string;
  recommendation: string;
  color: string;
}

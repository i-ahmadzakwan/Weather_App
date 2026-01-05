import { useState, useCallback } from 'react';
import { WeatherData } from '@/types/weather';

const API_KEY = '139f720068504a8c87d61339252306';
const API_BASE = 'https://api.weatherapi.com/v1/forecast.json';

export const useWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (location: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `${API_BASE}?key=${API_KEY}&q=${encodeURIComponent(location)}&days=1&aqi=yes&alerts=no`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 400) {
          throw new Error('Location not found. Please check the city name and try again.');
        }
        throw new Error(errorData?.error?.message || 'Failed to fetch weather data');
      }

      const weatherData: WeatherData = await response.json();
      setData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchWeather,
  };
};

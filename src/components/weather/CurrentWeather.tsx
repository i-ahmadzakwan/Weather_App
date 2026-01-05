import React from 'react';
import { WeatherData } from '@/types/weather';
import { WeatherIcon } from './WeatherAnimations';
import { Droplets, Wind, Thermometer, Eye } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { location, current } = data;

  const getWindCompass = (degree: number) => {
    return `rotate(${degree}deg)`;
  };

  const getUVInfo = (uv: number) => {
    if (uv <= 2) return { level: 'Low', recommendation: 'Wear sunglasses on bright days', color: 'text-uv-low' };
    if (uv <= 5) return { level: 'Moderate', recommendation: 'Use sunscreen SPF 30+', color: 'text-uv-moderate' };
    if (uv <= 7) return { level: 'High', recommendation: 'Protective clothing advised', color: 'text-uv-high' };
    return { level: 'Very High', recommendation: 'Minimize sun exposure', color: 'text-uv-very-high' };
  };

  const getClothingSuggestion = (temp: number) => {
    if (temp >= 30) return { emoji: '☀️', text: 'Very hot! Light, breathable clothing and stay hydrated' };
    if (temp >= 25) return { emoji: '👕', text: 'Warm weather – T-shirt and shorts recommended' };
    if (temp >= 15) return { emoji: '🧥', text: 'Mild weather – Light jacket suggested' };
    if (temp >= 5) return { emoji: '🧥', text: 'Cool weather – Wear a warm coat' };
    return { emoji: '❄️', text: 'Cold! Heavy winter wear necessary' };
  };

  const uvInfo = getUVInfo(current.uv);
  const clothingSuggestion = getClothingSuggestion(current.temp_c);

  return (
    <div className="glass-card p-6 md:p-8 floating-animation animate-slide-in">
      {/* Location */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
          {location.name}
        </h1>
        <p className="text-muted-foreground">{location.country}</p>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col items-center mb-8">
        <WeatherIcon 
          conditionCode={current.condition.code} 
          isDay={current.is_day}
          size="lg"
        />
        <p className="text-lg text-muted-foreground mt-2 mb-4">{current.condition.text}</p>
        <div className="text-6xl md:text-7xl font-light text-foreground text-glow">
          {Math.round(current.temp_c)}°C
        </div>
        <p className="text-muted-foreground mt-2 flex items-center gap-2">
          <Thermometer className="w-4 h-4" />
          Feels like {Math.round(current.feelslike_c)}°C
        </p>
      </div>

      {/* Clothing Suggestion */}
      <div className="glass-card p-4 mb-6 text-center animate-slide-in stagger-2">
        <p className="text-lg">
          <span className="mr-2">{clothingSuggestion.emoji}</span>
          {clothingSuggestion.text}
        </p>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Wind */}
        <div className="glass-card p-4 animate-slide-in stagger-3">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Wind className="w-4 h-4" />
            <span className="text-sm">Wind</span>
          </div>
          <div className="flex items-center gap-3">
            <span 
              className="text-2xl"
              style={{ transform: getWindCompass(current.wind_degree) }}
              aria-label={`Wind direction: ${current.wind_dir}`}
            >
              🧭
            </span>
            <div>
              <p className="text-xl font-semibold">{current.wind_kph} km/h</p>
              <p className="text-sm text-muted-foreground">{current.wind_dir}</p>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="glass-card p-4 animate-slide-in stagger-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Droplets className="w-4 h-4" />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-xl font-semibold mb-2">{current.humidity}%</p>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${current.humidity}%` }}
            />
          </div>
        </div>

        {/* UV Index */}
        <div className="glass-card p-4 animate-slide-in stagger-5">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <span className="text-sm">☀️ UV Index</span>
          </div>
          <p className={`text-xl font-semibold ${uvInfo.color}`}>{current.uv} - {uvInfo.level}</p>
          <p className="text-xs text-muted-foreground mt-1">{uvInfo.recommendation}</p>
        </div>

        {/* Dew Point */}
        <div className="glass-card p-4 animate-slide-in stagger-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Dew Point</span>
          </div>
          <p className="text-xl font-semibold">{Math.round(current.dewpoint_c)}°C</p>
        </div>
      </div>
    </div>
  );
};

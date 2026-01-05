import React, { useState } from 'react';
import { WeatherData } from '@/types/weather';
import { ChevronDown, ChevronUp, Wind } from 'lucide-react';

interface AirQualityProps {
  data: WeatherData;
}

export const AirQuality: React.FC<AirQualityProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const airQuality = data.current.air_quality;
  const aqiIndex = airQuality['us-epa-index'];

  const getAQIInfo = (index: number) => {
    switch (index) {
      case 1: return { label: 'Good', color: 'bg-aqi-good', textColor: 'text-aqi-good' };
      case 2: return { label: 'Moderate', color: 'bg-aqi-moderate', textColor: 'text-aqi-moderate' };
      case 3: return { label: 'Unhealthy for Sensitive Groups', color: 'bg-aqi-sensitive', textColor: 'text-aqi-sensitive' };
      case 4: return { label: 'Unhealthy', color: 'bg-aqi-unhealthy', textColor: 'text-aqi-unhealthy' };
      case 5: return { label: 'Very Unhealthy', color: 'bg-aqi-very-unhealthy', textColor: 'text-aqi-very-unhealthy' };
      case 6: return { label: 'Hazardous', color: 'bg-aqi-hazardous', textColor: 'text-aqi-hazardous' };
      default: return { label: 'Unknown', color: 'bg-muted', textColor: 'text-muted-foreground' };
    }
  };

  const aqiInfo = getAQIInfo(aqiIndex);

  const pollutants = [
    { name: 'PM2.5', value: airQuality.pm2_5, unit: 'µg/m³', description: 'Fine particles that can affect lungs' },
    { name: 'PM10', value: airQuality.pm10, unit: 'µg/m³', description: 'Coarse particles' },
    { name: 'O₃', value: airQuality.o3, unit: 'µg/m³', description: 'May irritate respiratory system' },
    { name: 'NO₂', value: airQuality.no2, unit: 'µg/m³', description: 'From vehicle emissions' },
    { name: 'SO₂', value: airQuality.so2, unit: 'µg/m³', description: 'From industrial processes' },
    { name: 'CO', value: airQuality.co, unit: 'µg/m³', description: 'Carbon monoxide levels' },
  ];

  return (
    <div className="glass-card p-4 md:p-6 mt-6 animate-slide-in">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left focus:outline-none group"
        aria-expanded={isExpanded}
        aria-label="Toggle air quality details"
      >
        <div className="flex items-center gap-3">
          <Wind className="w-5 h-5 text-muted-foreground" />
          <div>
            <h2 className="text-lg font-semibold text-foreground">Air Quality</h2>
            <p className={`text-sm ${aqiInfo.textColor}`}>{aqiInfo.label}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${aqiInfo.color} flex items-center justify-center text-white font-bold`}>
            {aqiIndex}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300" />
          )}
        </div>
      </button>

      <div 
        className={`overflow-hidden transition-all duration-500 ease-out ${
          isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="grid grid-cols-2 gap-3">
          {pollutants.map((pollutant, index) => (
            <div 
              key={pollutant.name}
              className="glass-card p-3 animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-sm font-medium text-foreground">{pollutant.name}</span>
                <span className="text-sm text-primary font-semibold">
                  {pollutant.value.toFixed(1)} <span className="text-xs text-muted-foreground">{pollutant.unit}</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{pollutant.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

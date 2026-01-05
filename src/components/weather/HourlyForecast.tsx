import React, { useRef } from 'react';
import { WeatherData } from '@/types/weather';
import { WeatherIcon } from './WeatherAnimations';

interface HourlyForecastProps {
  data: WeatherData;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Get current hour from location time
  const currentTime = new Date(data.location.localtime);
  const currentHour = currentTime.getHours();

  // Get next 12 hours starting from current hour
  const allHours = data.forecast.forecastday[0].hour;
  const upcomingHours = allHours
    .filter(hour => {
      const hourTime = new Date(hour.time);
      return hourTime.getHours() >= currentHour;
    })
    .slice(0, 12);

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12} ${ampm}`;
  };

  return (
    <div className="glass-card p-4 md:p-6 mt-6 animate-slide-in">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Hourly Forecast</h2>
      
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2 touch-pan-x"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {upcomingHours.map((hour, index) => (
          <div
            key={hour.time}
            className="glass-card-hover flex-shrink-0 p-3 min-w-[80px] text-center animate-slide-in"
            style={{ 
              scrollSnapAlign: 'start',
              animationDelay: `${index * 100}ms`,
            }}
          >
            <p className="text-sm text-muted-foreground mb-2">
              {index === 0 ? 'Now' : formatTime(hour.time)}
            </p>
            <div className="flex justify-center my-2">
              <WeatherIcon 
                conditionCode={hour.condition.code} 
                isDay={hour.is_day}
                size="sm"
              />
            </div>
            <p className="text-lg font-semibold text-foreground">
              {Math.round(hour.temp_c)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

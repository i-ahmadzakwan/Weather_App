import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '@/types/weather';
import { HourlyCard3D } from './HourlyCard3D';

interface EnhancedHourlyForecastProps {
  data: WeatherData;
}

export const EnhancedHourlyForecast: React.FC<EnhancedHourlyForecastProps> = ({ data }) => {
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
    <motion.div 
      className="glass-card p-4 md:p-6 mt-6 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
    >
      <motion.h2 
        className="text-lg font-semibold mb-4 text-foreground"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        Hourly Forecast
      </motion.h2>
      
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2 touch-pan-x"
        style={{ 
          scrollSnapType: 'x mandatory',
          perspective: 1000,
        }}
      >
        {upcomingHours.map((hour, index) => (
          <HourlyCard3D
            key={hour.time}
            time={formatTime(hour.time)}
            temp={hour.temp_c}
            conditionCode={hour.condition.code}
            isDay={hour.is_day}
            index={index}
            isNow={index === 0}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="flex justify-center gap-1 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="text-xs text-muted-foreground flex items-center gap-2"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>← Swipe for more →</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

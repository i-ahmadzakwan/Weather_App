import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherData } from '@/types/weather';
import { ChevronDown } from 'lucide-react';
import { AnimatedNumber, AnimatedProgressBar } from './AnimatedDataDisplay';

interface EnhancedAirQualityProps {
  data: WeatherData;
}

export const EnhancedAirQuality: React.FC<EnhancedAirQualityProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const airQuality = data.current.air_quality;

  if (!airQuality) return null;

  const getAQIInfo = (index: number) => {
    switch (index) {
      case 1: return { level: 'Good', color: 'text-aqi-good', bg: 'bg-aqi-good', description: 'Air quality is satisfactory' };
      case 2: return { level: 'Moderate', color: 'text-aqi-moderate', bg: 'bg-aqi-moderate', description: 'Acceptable air quality' };
      case 3: return { level: 'Unhealthy for Sensitive', color: 'text-aqi-sensitive', bg: 'bg-aqi-sensitive', description: 'Sensitive groups may be affected' };
      case 4: return { level: 'Unhealthy', color: 'text-aqi-unhealthy', bg: 'bg-aqi-unhealthy', description: 'Health effects possible' };
      case 5: return { level: 'Very Unhealthy', color: 'text-aqi-very-unhealthy', bg: 'bg-aqi-very-unhealthy', description: 'Health alert' };
      case 6: return { level: 'Hazardous', color: 'text-aqi-hazardous', bg: 'bg-aqi-hazardous', description: 'Emergency conditions' };
      default: return { level: 'Unknown', color: 'text-muted-foreground', bg: 'bg-muted', description: 'Data unavailable' };
    }
  };

  const aqiInfo = getAQIInfo(airQuality['us-epa-index']);

  const pollutants = [
    { name: 'PM2.5', value: airQuality.pm2_5, unit: 'µg/m³', description: 'Fine particles that can affect lungs', max: 150 },
    { name: 'PM10', value: airQuality.pm10, unit: 'µg/m³', description: 'Coarse particles', max: 300 },
    { name: 'O₃', value: airQuality.o3, unit: 'µg/m³', description: 'May irritate respiratory system', max: 200 },
    { name: 'NO₂', value: airQuality.no2, unit: 'µg/m³', description: 'From vehicle emissions', max: 200 },
    { name: 'SO₂', value: airQuality.so2, unit: 'µg/m³', description: 'From industrial processes', max: 100 },
    { name: 'CO', value: airQuality.co, unit: 'µg/m³', description: 'Carbon monoxide levels', max: 15000 },
  ];

  return (
    <motion.div 
      className="glass-card p-4 md:p-6 mt-6 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
    >
      <motion.button
        className="w-full flex items-center justify-between text-left"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div>
          <h2 className="text-lg font-semibold text-foreground">Air Quality</h2>
          <div className="flex items-center gap-2 mt-1">
            <motion.span 
              className={`inline-block w-3 h-3 rounded-full ${aqiInfo.bg}`}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`font-medium ${aqiInfo.color}`}>{aqiInfo.level}</span>
            <span className="text-sm text-muted-foreground">- {aqiInfo.description}</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {pollutants.map((pollutant, index) => (
                <motion.div
                  key={pollutant.name}
                  className="glass-card p-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{pollutant.name}</span>
                    <span className="text-sm">
                      <AnimatedNumber value={pollutant.value} decimals={1} /> {pollutant.unit}
                    </span>
                  </div>
                  <AnimatedProgressBar 
                    value={pollutant.value} 
                    max={pollutant.max}
                    color={`hsl(var(--primary))`}
                    showWave={false}
                  />
                  <p className="text-xs text-muted-foreground mt-2">{pollutant.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

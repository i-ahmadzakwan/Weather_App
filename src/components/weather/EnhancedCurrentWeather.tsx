import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '@/types/weather';
import { EnhancedWeatherIcon } from './EnhancedWeatherIcon';
import { AnimatedNumber, AnimatedProgressBar, AnimatedWindCompass, DataLine } from './AnimatedDataDisplay';
import { Droplets, Thermometer, Eye } from 'lucide-react';

interface EnhancedCurrentWeatherProps {
  data: WeatherData;
}

export const EnhancedCurrentWeather: React.FC<EnhancedCurrentWeatherProps> = ({ data }) => {
  const { location, current } = data;

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
    <motion.div 
      className="glass-card p-6 md:p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute -inset-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 30%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Location */}
      <DataLine index={0}>
        <div className="text-center mb-6 relative z-10">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-foreground mb-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            {location.name}
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {location.country}
          </motion.p>
        </div>
      </DataLine>

      {/* Main Weather Display */}
      <DataLine index={1}>
        <div className="flex flex-col items-center mb-8 relative z-10">
          <EnhancedWeatherIcon 
            conditionCode={current.condition.code} 
            isDay={current.is_day}
            size="lg"
          />
          
          <motion.p 
            className="text-lg text-muted-foreground mt-2 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {current.condition.text}
          </motion.p>
          
          <motion.div 
            className="text-6xl md:text-7xl font-light text-foreground"
            style={{
              textShadow: '0 0 30px hsl(var(--primary) / 0.3)',
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <AnimatedNumber value={Math.round(current.temp_c)} suffix="°C" duration={1.5} />
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground mt-2 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Thermometer className="w-4 h-4" />
            Feels like <AnimatedNumber value={Math.round(current.feelslike_c)} suffix="°C" />
          </motion.p>
        </div>
      </DataLine>

      {/* Clothing Suggestion */}
      <DataLine index={2}>
        <motion.div 
          className="glass-card p-4 mb-6 text-center relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)',
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-lg relative z-10">
            <span className="mr-2">{clothingSuggestion.emoji}</span>
            {clothingSuggestion.text}
          </p>
        </motion.div>
      </DataLine>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Wind */}
        <DataLine index={3}>
          <motion.div 
            className="glass-card p-4"
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <span className="text-sm">💨 Wind</span>
            </div>
            <div className="flex items-center gap-3">
              <AnimatedWindCompass 
                degree={current.wind_degree} 
                speed={current.wind_kph}
                direction={current.wind_dir}
              />
              <div>
                <p className="text-xl font-semibold">
                  <AnimatedNumber value={current.wind_kph} suffix=" km/h" />
                </p>
                <p className="text-sm text-muted-foreground">{current.wind_dir}</p>
              </div>
            </div>
          </motion.div>
        </DataLine>

        {/* Humidity */}
        <DataLine index={4}>
          <motion.div 
            className="glass-card p-4"
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Droplets className="w-4 h-4" />
              <span className="text-sm">Humidity</span>
            </div>
            <p className="text-xl font-semibold mb-2">
              <AnimatedNumber value={current.humidity} suffix="%" />
            </p>
            <AnimatedProgressBar value={current.humidity} showWave />
          </motion.div>
        </DataLine>

        {/* UV Index */}
        <DataLine index={5}>
          <motion.div 
            className="glass-card p-4 relative overflow-hidden"
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* UV glow based on level */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                background: `radial-gradient(circle at 80% 20%, hsl(var(--sun-color) / 0.3) 0%, transparent 60%)`,
              }}
            />
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <span className="text-sm">☀️ UV Index</span>
            </div>
            <p className={`text-xl font-semibold ${uvInfo.color} relative z-10`}>
              <AnimatedNumber value={current.uv} /> - {uvInfo.level}
            </p>
            <p className="text-xs text-muted-foreground mt-1 relative z-10">{uvInfo.recommendation}</p>
          </motion.div>
        </DataLine>

        {/* Dew Point */}
        <DataLine index={6}>
          <motion.div 
            className="glass-card p-4"
            whileHover={{ scale: 1.03, y: -3 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Dew Point</span>
            </div>
            <p className="text-xl font-semibold">
              <AnimatedNumber value={Math.round(current.dewpoint_c)} suffix="°C" />
            </p>
          </motion.div>
        </DataLine>
      </div>
    </motion.div>
  );
};

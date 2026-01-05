import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedWeatherIcon } from './EnhancedWeatherIcon';

interface HourlyCard3DProps {
  time: string;
  temp: number;
  conditionCode: number;
  isDay: number;
  index: number;
  isNow?: boolean;
  humidity?: number;
  windSpeed?: number;
  feelsLike?: number;
}

export const HourlyCard3D: React.FC<HourlyCard3DProps> = ({
  time,
  temp,
  conditionCode,
  isDay,
  index,
  isNow = false,
  humidity,
  windSpeed,
  feelsLike,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-[90px] h-[130px] cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.08,
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 glass-card p-3 flex flex-col items-center justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Now indicator */}
          {isNow && (
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}

          <motion.p 
            className="text-sm text-muted-foreground font-medium"
            animate={isNow ? { color: 'hsl(var(--primary))' } : {}}
          >
            {isNow ? 'Now' : time}
          </motion.p>
          
          <div className="my-1">
            <EnhancedWeatherIcon 
              conditionCode={conditionCode} 
              isDay={isDay}
              size="sm"
            />
          </div>
          
          <motion.p 
            className="text-xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.3 }}
          >
            {Math.round(temp)}°
          </motion.p>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 glass-card p-3 flex flex-col items-center justify-center gap-1"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-xs text-muted-foreground">Details</p>
          {feelsLike !== undefined && (
            <p className="text-xs">
              <span className="text-muted-foreground">Feels:</span> {Math.round(feelsLike)}°
            </p>
          )}
          {humidity !== undefined && (
            <p className="text-xs">
              <span className="text-muted-foreground">💧</span> {humidity}%
            </p>
          )}
          {windSpeed !== undefined && (
            <p className="text-xs">
              <span className="text-muted-foreground">💨</span> {Math.round(windSpeed)}km/h
            </p>
          )}
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          boxShadow: isNow 
            ? '0 0 20px hsl(var(--primary) / 0.4)'
            : '0 4px 20px hsl(var(--glass-shadow))',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

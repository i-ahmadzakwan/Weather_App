import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';

interface EnhancedBackgroundProps {
  conditionCode: number;
  isDay: number;
  isLight: boolean;
}

export const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({ 
  conditionCode, 
  isDay, 
  isLight 
}) => {
  const isNight = isDay === 0;

  const getGradientLayers = () => {
    // Clear day - warm sunlight
    if ([1000].includes(conditionCode) && !isNight) {
      if (isLight) {
        return [
          'radial-gradient(ellipse at top left, hsla(45, 100%, 75%, 0.4) 0%, transparent 50%)',
          'radial-gradient(ellipse at bottom right, hsla(35, 100%, 70%, 0.3) 0%, transparent 50%)',
          'linear-gradient(135deg, hsl(45 70% 92%) 0%, hsl(35 60% 85%) 100%)',
        ];
      }
      return [
        'radial-gradient(ellipse at top left, hsla(35, 100%, 55%, 0.5) 0%, transparent 50%)',
        'radial-gradient(ellipse at bottom right, hsla(25, 100%, 50%, 0.4) 0%, transparent 50%)',
        'linear-gradient(135deg, hsl(35 100% 55%) 0%, hsl(20 100% 45%) 100%)',
      ];
    }

    // Clear night - deep space
    if ([1000].includes(conditionCode) && isNight) {
      if (isLight) {
        return [
          'radial-gradient(ellipse at top, hsla(230, 50%, 85%, 0.5) 0%, transparent 50%)',
          'linear-gradient(180deg, hsl(230 40% 90%) 0%, hsl(220 30% 95%) 100%)',
        ];
      }
      return [
        'radial-gradient(ellipse at top, hsla(260, 60%, 20%, 0.8) 0%, transparent 60%)',
        'radial-gradient(ellipse at bottom left, hsla(200, 80%, 15%, 0.6) 0%, transparent 50%)',
        'linear-gradient(180deg, hsl(250 40% 10%) 0%, hsl(220 50% 8%) 50%, hsl(230 40% 5%) 100%)',
      ];
    }

    // Rain
    if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(conditionCode)) {
      if (isLight) {
        return [
          'radial-gradient(ellipse at top, hsla(210, 60%, 80%, 0.6) 0%, transparent 60%)',
          'linear-gradient(180deg, hsl(210 50% 85%) 0%, hsl(215 45% 90%) 100%)',
        ];
      }
      return [
        'radial-gradient(ellipse at top, hsla(220, 70%, 25%, 0.8) 0%, transparent 60%)',
        'radial-gradient(ellipse at bottom, hsla(200, 60%, 15%, 0.6) 0%, transparent 50%)',
        'linear-gradient(180deg, hsl(220 60% 15%) 0%, hsl(210 70% 10%) 100%)',
      ];
    }

    // Snow
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(conditionCode)) {
      if (isLight) {
        return [
          'radial-gradient(ellipse at top, hsla(200, 30%, 95%, 0.8) 0%, transparent 60%)',
          'linear-gradient(180deg, hsl(210 40% 92%) 0%, hsl(200 30% 96%) 100%)',
        ];
      }
      return [
        'radial-gradient(ellipse at top, hsla(210, 40%, 35%, 0.7) 0%, transparent 60%)',
        'linear-gradient(180deg, hsl(210 30% 25%) 0%, hsl(200 40% 15%) 100%)',
      ];
    }

    // Thunder/Storm
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      if (isLight) {
        return [
          'radial-gradient(ellipse at top, hsla(230, 40%, 65%, 0.6) 0%, transparent 60%)',
          'linear-gradient(180deg, hsl(230 35% 75%) 0%, hsl(220 30% 80%) 100%)',
        ];
      }
      return [
        'radial-gradient(ellipse at center, hsla(260, 50%, 15%, 0.8) 0%, transparent 70%)',
        'radial-gradient(ellipse at bottom, hsla(220, 60%, 10%, 0.9) 0%, transparent 60%)',
        'linear-gradient(180deg, hsl(250 40% 8%) 0%, hsl(230 50% 5%) 100%)',
      ];
    }

    // Cloudy
    if ([1003, 1006, 1009].includes(conditionCode)) {
      if (isLight) {
        return [
          'radial-gradient(ellipse at top right, hsla(210, 30%, 88%, 0.7) 0%, transparent 50%)',
          'linear-gradient(180deg, hsl(215 25% 90%) 0%, hsl(210 20% 95%) 100%)',
        ];
      }
      return [
        'radial-gradient(ellipse at top, hsla(220, 30%, 30%, 0.6) 0%, transparent 60%)',
        'linear-gradient(180deg, hsl(220 25% 18%) 0%, hsl(215 30% 12%) 100%)',
      ];
    }

    // Mist/Fog
    if ([1030, 1135, 1147].includes(conditionCode)) {
      if (isLight) {
        return [
          'radial-gradient(ellipse at center, hsla(220, 20%, 92%, 0.9) 0%, transparent 70%)',
          'linear-gradient(180deg, hsl(220 15% 88%) 0%, hsl(215 20% 94%) 100%)',
        ];
      }
      return [
        'radial-gradient(ellipse at center, hsla(220, 25%, 25%, 0.8) 0%, transparent 70%)',
        'linear-gradient(180deg, hsl(220 20% 15%) 0%, hsl(215 25% 10%) 100%)',
      ];
    }

    // Default
    if (isLight) {
      return [
        'linear-gradient(180deg, hsl(210 50% 96%) 0%, hsl(215 40% 98%) 100%)',
      ];
    }
    return [
      'linear-gradient(180deg, hsl(220 20% 5%) 0%, hsl(215 30% 8%) 100%)',
    ];
  };

  const gradients = getGradientLayers();

  // Aurora effect for clear nights
  const showAurora = [1000].includes(conditionCode) && isNight && !isLight;

  // Lightning flash for storms
  const showLightning = [1087, 1273, 1276, 1279, 1282].includes(conditionCode);

  // God rays for sunny days
  const showGodRays = [1000].includes(conditionCode) && !isNight;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Base gradient layers with animation */}
        {gradients.map((gradient, index) => (
          <motion.div
            key={`${conditionCode}-${index}`}
            className="absolute inset-0"
            style={{ background: gradient }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: index * 0.2 }}
          />
        ))}
      </AnimatePresence>

      {/* Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsla(var(--primary) / 0.15) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, hsla(var(--accent) / 0.1) 0%, transparent 40%)
          `,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Aurora effect */}
      {showAurora && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-64"
              style={{
                top: `${10 + i * 8}%`,
                background: `linear-gradient(90deg, 
                  transparent, 
                  hsla(${160 + i * 40}, 80%, 50%, 0.15), 
                  hsla(${200 + i * 30}, 70%, 60%, 0.1), 
                  transparent)`,
                filter: 'blur(30px)',
              }}
              animate={{
                x: ['-50%', '50%', '-50%'],
                opacity: [0.3, 0.6, 0.3],
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 15 + i * 3,
                delay: i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* God rays for sunny weather */}
      {showGodRays && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute origin-top"
              style={{
                top: 0,
                left: `${10 + i * 20}%`,
                width: 100,
                height: '100%',
                background: `linear-gradient(180deg, 
                  hsla(45, 100%, 70%, ${isLight ? 0.15 : 0.25}) 0%, 
                  transparent 60%)`,
                transform: `rotate(${-20 + i * 10}deg)`,
                filter: 'blur(20px)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleY: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 4 + i,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Lightning flash */}
      {showLightning && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, hsla(50, 100%, 70%, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            opacity: [0, 0, 0.8, 0, 0, 0, 0.6, 0, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.2, 0.21, 0.25, 0.5, 0.7, 0.71, 0.75, 1],
          }}
        />
      )}

      {/* Moving fog/mist layer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/3"
        style={{
          background: `linear-gradient(180deg, 
            transparent 0%, 
            hsla(var(--background) / 0.3) 50%, 
            hsla(var(--background) / 0.6) 100%)`,
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Particle system */}
      <ParticleBackground 
        conditionCode={conditionCode} 
        isDay={isDay} 
        isLight={isLight} 
      />

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, hsla(var(--background) / 0.4) 100%)',
        }}
      />
    </div>
  );
};

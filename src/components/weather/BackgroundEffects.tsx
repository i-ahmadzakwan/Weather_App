import React, { useMemo } from 'react';

interface BackgroundEffectsProps {
  conditionCode: number;
  isDay: number;
  isLight: boolean;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ conditionCode, isDay, isLight }) => {
  const getGradient = () => {
    const isNight = isDay === 0;
    
    // Sunny / Clear
    if ([1000].includes(conditionCode)) {
      if (isNight) {
        return isLight 
          ? 'linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)'
          : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
      }
      return isLight 
        ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
        : 'linear-gradient(135deg, #ff9933 0%, #ff5722 50%, #c62828 100%)';
    }
    
    // Cloudy
    if ([1003, 1006, 1009].includes(conditionCode)) {
      return isLight 
        ? 'linear-gradient(135deg, #d7e1ec 0%, #ffffff 100%)'
        : 'linear-gradient(135deg, #2c3e50 0%, #4a5568 50%, #2d3748 100%)';
    }
    
    // Rain
    if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(conditionCode)) {
      return isLight 
        ? 'linear-gradient(135deg, #89CFF0 0%, #4b6cb7 100%)'
        : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #182848 100%)';
    }
    
    // Snow
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(conditionCode)) {
      return isLight 
        ? 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)'
        : 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 50%, #2c3e50 100%)';
    }
    
    // Thunder
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      return isLight 
        ? 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)'
        : 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)';
    }
    
    // Mist/Fog
    if ([1030, 1135, 1147].includes(conditionCode)) {
      return isLight 
        ? 'linear-gradient(135deg, #bdc3c7 0%, #d6dee7 100%)'
        : 'linear-gradient(135deg, #3d4a5d 0%, #4a5568 50%, #2d3748 100%)';
    }
    
    // Default
    return isLight 
      ? 'linear-gradient(135deg, #d7ecff 0%, #ffffff 100%)'
      : 'linear-gradient(135deg, #0a0a0a 0%, #0d1b2a 50%, #1a1a2e 100%)';
  };

  const particles = useMemo(() => {
    const isNight = isDay === 0;
    const isClear = [1000].includes(conditionCode);
    
    if (isNight && isClear) {
      // Stars for clear night
      return [...Array(20)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60}%`,
        delay: Math.random() * 3,
        size: Math.random() * 3 + 1,
        type: 'star' as const,
      }));
    }
    
    // Floating particles
    return [...Array(8)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: undefined,
      delay: Math.random() * 5,
      size: Math.random() * 4 + 2,
      type: 'particle' as const,
    }));
  }, [conditionCode, isDay]);

  return (
    <div 
      className="fixed inset-0 transition-all duration-1000 animate-gradient -z-10"
      style={{ 
        background: getGradient(),
        backgroundSize: '400% 400%',
      }}
    >
      {/* Particles */}
      {particles.map((particle, i) => (
        particle.type === 'star' ? (
          <div
            key={i}
            className="absolute rounded-full animate-star"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: 'white',
              boxShadow: '0 0 6px white',
              animationDelay: `${particle.delay}s`,
            }}
          />
        ) : (
          <div
            key={i}
            className="absolute rounded-full animate-particle opacity-30"
            style={{
              left: particle.left,
              bottom: '-10%',
              width: particle.size,
              height: particle.size,
              background: isLight ? 'hsl(195 100% 50% / 0.3)' : 'hsl(195 100% 70% / 0.3)',
              animationDelay: `${particle.delay}s`,
            }}
          />
        )
      ))}

      {/* Overlay gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: isLight 
            ? 'radial-gradient(ellipse at top, transparent 0%, hsl(210 50% 96% / 0.3) 100%)'
            : 'radial-gradient(ellipse at top, transparent 0%, hsl(220 20% 4% / 0.5) 100%)',
        }}
      />
    </div>
  );
};

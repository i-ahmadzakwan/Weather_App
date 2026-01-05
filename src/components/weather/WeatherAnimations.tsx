import React from 'react';

export const SunAnimation: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div 
      className="w-16 h-16 rounded-full animate-spin-slow"
      style={{
        background: 'linear-gradient(135deg, hsl(45 100% 55%) 0%, hsl(35 100% 50%) 100%)',
        boxShadow: '0 0 40px hsl(45 100% 55% / 0.8), 0 0 80px hsl(45 100% 55% / 0.4)',
      }}
    />
    {/* Sun rays */}
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-4 rounded-full"
        style={{
          background: 'linear-gradient(to bottom, hsl(45 100% 55%), transparent)',
          transform: `rotate(${i * 45}deg) translateY(-36px)`,
        }}
      />
    ))}
  </div>
);

export const MoonAnimation: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center animate-moon">
    <div 
      className="w-14 h-14 rounded-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(220 20% 80%) 0%, hsl(220 15% 65%) 100%)',
        boxShadow: '0 0 30px hsl(0 0% 100% / 0.3), inset -5px -5px 15px hsl(220 20% 50% / 0.5)',
      }}
    >
      {/* Craters */}
      <div className="absolute w-3 h-3 rounded-full top-2 left-3 bg-black/10" />
      <div className="absolute w-2 h-2 rounded-full top-6 left-7 bg-black/10" />
      <div className="absolute w-4 h-4 rounded-full bottom-2 left-2 bg-black/10" />
    </div>
  </div>
);

export const RainAnimation: React.FC = () => (
  <div className="relative w-20 h-20 overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-6 rounded-full animate-rain"
        style={{
          left: `${15 + i * 12}%`,
          background: 'linear-gradient(to bottom, hsl(200 80% 60%), transparent)',
          boxShadow: '0 0 6px hsl(200 80% 60% / 0.5)',
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
    <CloudShape className="absolute top-0" />
  </div>
);

export const SnowAnimation: React.FC = () => (
  <div className="relative w-20 h-20 overflow-hidden">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="absolute text-lg animate-snow"
        style={{
          left: `${10 + i * 18}%`,
          animationDelay: `${i * 0.5}s`,
          filter: 'drop-shadow(0 0 4px white)',
        }}
      >
        ❄
      </div>
    ))}
    <CloudShape className="absolute top-0" color="hsl(200 30% 85%)" />
  </div>
);

export const CloudAnimation: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center animate-cloud">
    <CloudShape />
  </div>
);

interface CloudShapeProps {
  className?: string;
  color?: string;
}

const CloudShape: React.FC<CloudShapeProps> = ({ className = '', color = 'hsl(220 15% 75%)' }) => (
  <div className={`relative ${className}`}>
    <div 
      className="w-12 h-6 rounded-full"
      style={{ background: color }}
    />
    <div 
      className="absolute -top-2 left-2 w-6 h-6 rounded-full"
      style={{ background: color }}
    />
    <div 
      className="absolute -top-1 left-5 w-5 h-5 rounded-full"
      style={{ background: color }}
    />
  </div>
);

export const ThunderAnimation: React.FC = () => (
  <div className="relative w-20 h-20 overflow-hidden">
    <CloudShape className="absolute top-0" />
    <div className="absolute top-8 left-8 animate-lightning">
      <svg width="20" height="30" viewBox="0 0 20 30">
        <path
          d="M12 0 L6 12 L10 12 L4 30 L16 12 L12 12 Z"
          fill="hsl(50 100% 60%)"
          style={{
            filter: 'drop-shadow(0 0 10px hsl(50 100% 60%))',
          }}
        />
      </svg>
    </div>
  </div>
);

export const MistAnimation: React.FC = () => (
  <div className="relative w-20 h-20 flex flex-col items-center justify-center gap-2">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="h-1 rounded-full animate-cloud"
        style={{
          width: `${60 - i * 10}%`,
          background: 'hsl(220 15% 70%)',
          animationDelay: `${i * 0.3}s`,
          opacity: 0.7 - i * 0.1,
        }}
      />
    ))}
  </div>
);

interface WeatherIconProps {
  conditionCode: number;
  isDay: number;
  size?: 'sm' | 'md' | 'lg';
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ conditionCode, isDay, size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  };

  const getWeatherAnimation = () => {
    // Sunny / Clear
    if ([1000].includes(conditionCode)) {
      return isDay ? <SunAnimation /> : <MoonAnimation />;
    }
    // Partly cloudy
    if ([1003, 1006].includes(conditionCode)) {
      return <CloudAnimation />;
    }
    // Overcast
    if ([1009].includes(conditionCode)) {
      return <CloudAnimation />;
    }
    // Mist, Fog
    if ([1030, 1135, 1147].includes(conditionCode)) {
      return <MistAnimation />;
    }
    // Rain
    if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(conditionCode)) {
      return <RainAnimation />;
    }
    // Snow
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(conditionCode)) {
      return <SnowAnimation />;
    }
    // Thunder
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      return <ThunderAnimation />;
    }
    // Default to sun/moon
    return isDay ? <SunAnimation /> : <MoonAnimation />;
  };

  return (
    <div className={`${sizeClasses[size]} flex items-center justify-center transition-all duration-500`}>
      {getWeatherAnimation()}
    </div>
  );
};

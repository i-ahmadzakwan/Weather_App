import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedWeatherIconProps {
  conditionCode: number;
  isDay: number;
  size?: 'sm' | 'md' | 'lg';
}

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -360,
    opacity: 0,
  },
  visible: {
    scale: [0, 1.3, 1],
    rotate: [-360, 15, 0],
    opacity: 1,
    transition: {
      duration: 1.5,
      times: [0, 0.6, 1],
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
};

const glowPulse = {
  scale: [1, 1.1, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Particle burst effect
const ParticleBurst: React.FC<{ color: string }> = ({ color }) => (
  <motion.div className="absolute inset-0 pointer-events-none">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: color,
          left: '50%',
          top: '50%',
          boxShadow: `0 0 10px ${color}`,
        }}
        initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
        animate={{
          scale: [0, 1.5, 0],
          x: Math.cos((i * Math.PI * 2) / 8) * 60,
          y: Math.sin((i * Math.PI * 2) / 8) * 60,
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: 'easeOut',
        }}
      />
    ))}
  </motion.div>
);

// Enhanced Sun with lens flare and rays
const EnhancedSun: React.FC = () => (
  <motion.div 
    className="relative w-24 h-24 flex items-center justify-center"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Glow layer */}
    <motion.div
      className="absolute w-32 h-32 rounded-full"
      style={{
        background: 'radial-gradient(circle, hsla(45, 100%, 60%, 0.4) 0%, transparent 70%)',
      }}
      animate={glowPulse}
    />
    
    {/* Animated rays */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-8 rounded-full origin-center"
        style={{
          background: 'linear-gradient(to bottom, hsl(45 100% 55%), transparent)',
          transform: `rotate(${i * 30}deg) translateY(-40px)`,
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scaleY: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          delay: i * 0.1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
    
    {/* Main sun */}
    <motion.div
      className="w-16 h-16 rounded-full relative z-10"
      style={{
        background: 'radial-gradient(circle at 30% 30%, hsl(50 100% 70%), hsl(40 100% 50%))',
        boxShadow: '0 0 60px hsl(45 100% 55% / 0.8), 0 0 120px hsl(45 100% 55% / 0.4)',
      }}
      animate={{
        rotate: 360,
        boxShadow: [
          '0 0 60px hsl(45 100% 55% / 0.8), 0 0 120px hsl(45 100% 55% / 0.4)',
          '0 0 80px hsl(45 100% 55% / 1), 0 0 150px hsl(45 100% 55% / 0.6)',
          '0 0 60px hsl(45 100% 55% / 0.8), 0 0 120px hsl(45 100% 55% / 0.4)',
        ],
      }}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
        boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
    
    <ParticleBurst color="hsl(45, 100%, 60%)" />
  </motion.div>
);

// Enhanced Moon with stars
const EnhancedMoon: React.FC = () => (
  <motion.div 
    className="relative w-24 h-24 flex items-center justify-center"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Glow */}
    <motion.div
      className="absolute w-28 h-28 rounded-full"
      style={{
        background: 'radial-gradient(circle, hsla(220, 50%, 90%, 0.3) 0%, transparent 70%)',
      }}
      animate={glowPulse}
    />
    
    {/* Twinkling stars around moon */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{
          left: `${20 + Math.random() * 60}%`,
          top: `${10 + Math.random() * 80}%`,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 1 + Math.random(),
          delay: i * 0.3,
          repeat: Infinity,
        }}
      >
        <span className="text-xs">✦</span>
      </motion.div>
    ))}
    
    {/* Main moon */}
    <motion.div
      className="w-14 h-14 rounded-full relative z-10 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 70% 30%, hsl(60 10% 95%), hsl(220 20% 75%))',
        boxShadow: '0 0 40px hsl(0 0% 100% / 0.4), inset -6px -6px 20px hsl(220 30% 60% / 0.6)',
      }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Craters */}
      <div className="absolute w-3 h-3 rounded-full top-2 left-3 bg-gradient-to-br from-transparent to-black/15" />
      <div className="absolute w-2 h-2 rounded-full top-7 left-8 bg-gradient-to-br from-transparent to-black/10" />
      <div className="absolute w-4 h-4 rounded-full bottom-2 left-2 bg-gradient-to-br from-transparent to-black/10" />
    </motion.div>
    
    <ParticleBurst color="hsl(220, 50%, 90%)" />
  </motion.div>
);

// Enhanced Rain with ripples
const EnhancedRain: React.FC = () => (
  <motion.div 
    className="relative w-24 h-24 overflow-visible"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Cloud */}
    <motion.div 
      className="absolute top-0 left-1/2 -translate-x-1/2"
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative">
        <div 
          className="w-16 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(220 20% 70%) 0%, hsl(220 20% 60%) 100%)' }}
        />
        <div 
          className="absolute -top-3 left-3 w-8 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(220 20% 75%) 0%, hsl(220 20% 65%) 100%)' }}
        />
        <div 
          className="absolute -top-2 left-8 w-6 h-6 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(220 20% 72%) 0%, hsl(220 20% 62%) 100%)' }}
        />
      </div>
    </motion.div>
    
    {/* Rain drops with trails */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-0.5"
        style={{
          left: `${15 + i * 10}%`,
          top: 30,
          height: 20,
          background: 'linear-gradient(to bottom, hsl(200 80% 70%), transparent)',
          borderRadius: 4,
          boxShadow: '0 0 8px hsl(200 80% 70% / 0.6)',
        }}
        animate={{
          y: [0, 50],
          opacity: [1, 0],
          scaleY: [1, 0.6],
        }}
        transition={{
          duration: 0.8,
          delay: i * 0.15,
          repeat: Infinity,
          ease: 'easeIn',
        }}
      />
    ))}
    
    {/* Ripple effects at bottom */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`ripple-${i}`}
        className="absolute bottom-2 rounded-full border border-primary/30"
        style={{
          left: `${20 + i * 25}%`,
          width: 10,
          height: 4,
        }}
        animate={{
          scale: [0, 2, 3],
          opacity: [0.8, 0.4, 0],
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.5,
          repeat: Infinity,
        }}
      />
    ))}
    
    <ParticleBurst color="hsl(200, 80%, 60%)" />
  </motion.div>
);

// Enhanced Snow with wind gusts
const EnhancedSnow: React.FC = () => (
  <motion.div 
    className="relative w-24 h-24 overflow-visible"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Cloud */}
    <motion.div 
      className="absolute top-0 left-1/2 -translate-x-1/2"
      animate={{ x: [0, 3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative">
        <div 
          className="w-16 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(210 30% 88%) 0%, hsl(210 30% 78%) 100%)' }}
        />
        <div 
          className="absolute -top-3 left-3 w-8 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(210 30% 92%) 0%, hsl(210 30% 82%) 100%)' }}
        />
        <div 
          className="absolute -top-2 left-8 w-6 h-6 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(210 30% 90%) 0%, hsl(210 30% 80%) 100%)' }}
        />
      </div>
    </motion.div>
    
    {/* Snowflakes */}
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white"
        style={{
          left: `${10 + i * 9}%`,
          top: 30,
          fontSize: 10 + Math.random() * 6,
          textShadow: '0 0 8px rgba(255,255,255,0.8)',
        }}
        animate={{
          y: [0, 50],
          x: [0, Math.sin(i) * 15],
          rotate: [0, 360],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2 + Math.random(),
          delay: i * 0.2,
          repeat: Infinity,
          ease: 'easeIn',
        }}
      >
        ❄
      </motion.div>
    ))}
    
    {/* Snow accumulation */}
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-2 rounded-full"
      style={{
        background: 'linear-gradient(180deg, hsl(210 30% 95%), hsl(210 30% 88%))',
        boxShadow: '0 -2px 10px rgba(255,255,255,0.5)',
      }}
      animate={{
        scaleX: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    
    <ParticleBurst color="hsl(210, 30%, 95%)" />
  </motion.div>
);

// Enhanced Thunder
const EnhancedThunder: React.FC = () => (
  <motion.div 
    className="relative w-24 h-24 overflow-visible"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Dark cloud */}
    <motion.div 
      className="absolute top-0 left-1/2 -translate-x-1/2"
      animate={{ 
        x: [0, -5, 5, 0],
        y: [0, 2, -2, 0],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative">
        <div 
          className="w-18 h-9 rounded-full"
          style={{ 
            width: 72,
            height: 36,
            background: 'linear-gradient(180deg, hsl(220 30% 40%) 0%, hsl(220 30% 25%) 100%)' 
          }}
        />
        <div 
          className="absolute -top-4 left-3 w-9 h-9 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(220 30% 45%) 0%, hsl(220 30% 30%) 100%)' }}
        />
        <div 
          className="absolute -top-2 left-10 w-7 h-7 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(220 30% 42%) 0%, hsl(220 30% 28%) 100%)' }}
        />
      </div>
    </motion.div>
    
    {/* Lightning bolt */}
    <motion.div
      className="absolute top-10 left-1/2 -translate-x-1/2"
      animate={{
        opacity: [0, 1, 1, 0, 0, 1, 0],
        scale: [0.9, 1.1, 1, 0.9, 0.9, 1.05, 0.9],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        times: [0, 0.1, 0.15, 0.2, 0.8, 0.85, 1],
      }}
    >
      <svg width="24" height="40" viewBox="0 0 24 40">
        <motion.path
          d="M14 0 L8 16 L13 16 L6 40 L18 16 L13 16 Z"
          fill="hsl(50 100% 60%)"
          style={{
            filter: 'drop-shadow(0 0 15px hsl(50 100% 60%)) drop-shadow(0 0 30px hsl(50 100% 70%))',
          }}
        />
      </svg>
    </motion.div>
    
    {/* Screen flash effect */}
    <motion.div
      className="absolute -inset-10 rounded-3xl pointer-events-none"
      style={{
        background: 'radial-gradient(circle, hsla(50, 100%, 70%, 0.3) 0%, transparent 70%)',
      }}
      animate={{
        opacity: [0, 0.6, 0, 0, 0.4, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        times: [0, 0.1, 0.2, 0.8, 0.85, 1],
      }}
    />
    
    <ParticleBurst color="hsl(50, 100%, 60%)" />
  </motion.div>
);

// Enhanced Clouds
const EnhancedCloud: React.FC = () => (
  <motion.div 
    className="relative w-24 h-24 flex items-center justify-center"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    {/* Background cloud layer */}
    <motion.div
      className="absolute"
      style={{ left: 30, top: 25 }}
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative opacity-60">
        <div 
          className="w-12 h-6 rounded-full"
          style={{ background: 'hsl(220 15% 65%)' }}
        />
        <div 
          className="absolute -top-2 left-2 w-5 h-5 rounded-full"
          style={{ background: 'hsl(220 15% 68%)' }}
        />
      </div>
    </motion.div>
    
    {/* Main cloud */}
    <motion.div
      className="relative z-10"
      animate={{ 
        x: [0, -5, 0],
        y: [0, -3, 0],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="relative">
        <div 
          className="w-16 h-8 rounded-full"
          style={{ 
            background: 'linear-gradient(180deg, hsl(220 15% 80%) 0%, hsl(220 15% 70%) 100%)',
            boxShadow: '0 4px 20px hsl(220 15% 50% / 0.3)',
          }}
        />
        <div 
          className="absolute -top-3 left-3 w-8 h-8 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(220 15% 85%) 0%, hsl(220 15% 75%) 100%)' }}
        />
        <div 
          className="absolute -top-2 left-8 w-6 h-6 rounded-full"
          style={{ background: 'linear-gradient(180deg, hsl(220 15% 82%) 0%, hsl(220 15% 72%) 100%)' }}
        />
      </div>
    </motion.div>
    
    {/* Sun peeking through */}
    <motion.div
      className="absolute -right-2 top-2 w-8 h-8 rounded-full"
      style={{
        background: 'radial-gradient(circle at 30% 30%, hsl(45 100% 70%), hsl(40 100% 55%))',
        boxShadow: '0 0 20px hsl(45 100% 55% / 0.5)',
      }}
      animate={{
        opacity: [0.3, 0.8, 0.3],
        scale: [0.9, 1.1, 0.9],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    
    <ParticleBurst color="hsl(220, 15%, 75%)" />
  </motion.div>
);

// Enhanced Mist
const EnhancedMist: React.FC = () => (
  <motion.div 
    className="relative w-24 h-24 flex flex-col items-center justify-center gap-2"
    variants={iconVariants}
    initial="hidden"
    animate="visible"
  >
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="h-1.5 rounded-full"
        style={{
          width: `${70 - i * 12}%`,
          background: `linear-gradient(90deg, transparent, hsl(220 15% ${70 - i * 5}%), transparent)`,
        }}
        animate={{
          x: [0, 15, 0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3 + i * 0.5,
          delay: i * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
    <ParticleBurst color="hsl(220, 15%, 70%)" />
  </motion.div>
);

export const EnhancedWeatherIcon: React.FC<EnhancedWeatherIconProps> = ({ 
  conditionCode, 
  isDay, 
  size = 'lg' 
}) => {
  const sizeClasses = {
    sm: 'scale-50',
    md: 'scale-75',
    lg: 'scale-100',
  };

  const getWeatherAnimation = () => {
    // Sunny / Clear
    if ([1000].includes(conditionCode)) {
      return isDay ? <EnhancedSun /> : <EnhancedMoon />;
    }
    // Partly cloudy / Cloudy
    if ([1003, 1006, 1009].includes(conditionCode)) {
      return <EnhancedCloud />;
    }
    // Mist, Fog
    if ([1030, 1135, 1147].includes(conditionCode)) {
      return <EnhancedMist />;
    }
    // Rain
    if ([1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(conditionCode)) {
      return <EnhancedRain />;
    }
    // Snow
    if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261, 1264].includes(conditionCode)) {
      return <EnhancedSnow />;
    }
    // Thunder
    if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
      return <EnhancedThunder />;
    }
    // Default
    return isDay ? <EnhancedSun /> : <EnhancedMoon />;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={conditionCode}
        className={`${sizeClasses[size]} flex items-center justify-center`}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, scale: 0, rotate: 180 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        {getWeatherAnimation()}
      </motion.div>
    </AnimatePresence>
  );
};

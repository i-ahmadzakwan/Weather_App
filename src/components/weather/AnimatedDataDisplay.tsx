import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  suffix = '', 
  duration = 1.5,
  decimals = 0 
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = displayValue;
    const endValue = value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Ease out cubic for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOut;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {displayValue.toFixed(decimals)}{suffix}
    </motion.span>
  );
};

interface AnimatedProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showWave?: boolean;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({ 
  value, 
  max = 100,
  color = 'hsl(var(--primary))',
  showWave = true 
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
      <motion.div
        className="h-full rounded-full relative overflow-hidden"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ 
          duration: 1.5, 
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Wave effect */}
        {showWave && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.2) 25%, 
                rgba(255,255,255,0.4) 50%, 
                rgba(255,255,255,0.2) 75%, 
                transparent 100%)`,
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}
        
        {/* Glow pulse */}
        <motion.div
          className="absolute inset-0"
          animate={{
            boxShadow: [
              `0 0 10px ${color}`,
              `0 0 25px ${color}`,
              `0 0 10px ${color}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
      
      {/* Water droplet decorations */}
      {showWave && [...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/60"
          style={{ left: `${20 + i * 25}%` }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

interface AnimatedWindCompassProps {
  degree: number;
  speed: number;
  direction: string;
}

export const AnimatedWindCompass: React.FC<AnimatedWindCompassProps> = ({ 
  degree, 
  speed, 
  direction 
}) => {
  return (
    <motion.div 
      className="relative w-12 h-12 flex items-center justify-center"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Compass ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Direction indicator */}
      <motion.div
        className="text-3xl"
        animate={{ rotate: degree }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        whileHover={{
          rotate: [degree, degree + 15, degree - 15, degree],
          transition: { duration: 0.5 },
        }}
      >
        🧭
      </motion.div>
      
      {/* Wind lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-0.5 rounded-full bg-primary/40"
          style={{
            left: '100%',
            top: `${35 + i * 15}%`,
          }}
          animate={{
            x: [0, 20, 0],
            opacity: [0, 1, 0],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5 - speed / 50,
            delay: i * 0.2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
};

interface DataLineProps {
  children: React.ReactNode;
  index: number;
}

export const DataLine: React.FC<DataLineProps> = ({ children, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay: index * 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const RippleButton: React.FC<RippleButtonProps> = ({ 
  children, 
  onClick, 
  className = '' 
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples(prev => [...prev, { x, y, id: Date.now() }]);
    onClick?.();
    
    setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 600);
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  );
};

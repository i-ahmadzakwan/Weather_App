import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Main weather card skeleton */}
      <motion.div
        className="glass-card p-6 md:p-8 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Location skeleton */}
        <div className="text-center mb-6">
          <SkeletonPulse className="h-8 w-48 mx-auto mb-2 rounded-lg" />
          <SkeletonPulse className="h-4 w-32 mx-auto rounded" />
        </div>

        {/* Weather icon skeleton */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="w-24 h-24 rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted-foreground) / 0.2) 100%)',
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Morphing weather shapes */}
            <motion.div
              className="absolute inset-2 rounded-full bg-muted"
              animate={{
                borderRadius: ['50%', '30%', '50%', '40%', '50%'],
                scale: [0.8, 1, 0.9, 1.05, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
          
          <SkeletonPulse className="h-5 w-28 mt-4 rounded" />
          <SkeletonPulse className="h-16 w-36 mt-4 rounded-xl" />
          <SkeletonPulse className="h-4 w-24 mt-3 rounded" />
        </div>

        {/* Clothing suggestion skeleton */}
        <SkeletonPulse className="h-14 w-full mb-6 rounded-2xl" />

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="glass-card p-4 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <SkeletonPulse className="h-4 w-16 mb-3 rounded" />
              <SkeletonPulse className="h-6 w-24 rounded" />
              {i === 1 && <SkeletonPulse className="h-2 w-full mt-3 rounded-full" />}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hourly forecast skeleton */}
      <motion.div
        className="glass-card p-4 md:p-6 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SkeletonPulse className="h-6 w-36 mb-4 rounded" />
        <div className="flex gap-3 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 p-3 min-w-[80px] glass-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <SkeletonPulse className="h-4 w-12 mx-auto mb-2 rounded" />
              <SkeletonPulse className="h-10 w-10 mx-auto mb-2 rounded-full" />
              <SkeletonPulse className="h-5 w-8 mx-auto rounded" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

interface SkeletonPulseProps {
  className?: string;
}

const SkeletonPulse: React.FC<SkeletonPulseProps> = ({ className = '' }) => (
  <motion.div
    className={`relative overflow-hidden bg-muted ${className}`}
    animate={{
      opacity: [0.5, 0.8, 0.5],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.1), transparent)',
      }}
      animate={{
        x: ['-100%', '100%'],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </motion.div>
);

// 3D Globe loader
export const GlobeLoader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <motion.div
      className="relative w-20 h-20"
      animate={{ rotateY: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      style={{ transformStyle: 'preserve-3d', perspective: 500 }}
    >
      {/* Globe */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.8) 0%, hsl(var(--accent) / 0.6) 100%)',
          boxShadow: `
            inset -10px -10px 20px hsl(var(--primary) / 0.3),
            0 0 30px hsl(var(--primary) / 0.3)
          `,
        }}
      />
      
      {/* Latitude lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 border border-foreground/20 rounded-full"
          style={{
            width: `${70 - i * 15}%`,
            height: 4,
            top: `${30 + i * 20}%`,
          }}
        />
      ))}
      
      {/* Longitude line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full border-l border-foreground/20 rounded-full"
      />
    </motion.div>
    
    <motion.p
      className="text-muted-foreground mt-6"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Fetching weather data...
    </motion.p>
    
    {/* Animated dots */}
    <div className="flex gap-1 mt-2">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.15,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  </div>
);

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface EnhancedThemeToggleProps {
  isLight: boolean;
  onToggle: () => void;
}

export const EnhancedThemeToggle: React.FC<EnhancedThemeToggleProps> = ({ 
  isLight, 
  onToggle 
}) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 glass-card rounded-full overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isLight 
            ? 'radial-gradient(circle, hsla(45, 100%, 60%, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, hsla(220, 60%, 70%, 0.3) 0%, transparent 70%)',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Icon container */}
      <div className="relative w-6 h-6">
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div
              key="sun"
              className="absolute inset-0"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20,
                duration: 0.5 
              }}
            >
              <Sun className="w-6 h-6 text-sun" />
              
              {/* Sun rays animation */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-1.5 bg-sun rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center',
                  }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                  initial={{
                    x: `${Math.cos((i * Math.PI * 2) / 8) * 16 - 1}px`,
                    y: `${Math.sin((i * Math.PI * 2) / 8) * 16 - 3}px`,
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              className="absolute inset-0"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 20,
                duration: 0.5 
              }}
            >
              <Moon className="w-6 h-6 text-moon" />
              
              {/* Stars animation */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-xs"
                  style={{
                    left: `${-8 + i * 20}px`,
                    top: `${-5 + i * 8}px`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1 + i * 0.3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                >
                  ✦
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={isLight ? 'light-ripple' : 'dark-ripple'}
        style={{
          background: isLight 
            ? 'radial-gradient(circle, hsl(45 100% 60%) 0%, transparent 70%)'
            : 'radial-gradient(circle, hsl(220 60% 70%) 0%, transparent 70%)',
        }}
      />
    </motion.button>
  );
};

// Color wave transition overlay
export const ThemeTransitionOverlay: React.FC<{ isLight: boolean }> = ({ isLight }) => (
  <AnimatePresence>
    <motion.div
      key={isLight ? 'light' : 'dark'}
      className="fixed inset-0 pointer-events-none z-[100]"
      initial={{ clipPath: 'circle(0% at calc(100% - 28px) 28px)' }}
      animate={{ clipPath: 'circle(150% at calc(100% - 28px) 28px)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: isLight 
          ? 'linear-gradient(135deg, hsl(45 70% 90%), hsl(35 60% 95%))'
          : 'linear-gradient(135deg, hsl(220 20% 10%), hsl(230 30% 5%))',
      }}
    />
  </AnimatePresence>
);

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedContainerProps {
  children: ReactNode;
  isVisible: boolean;
  locationKey?: string;
}

// Elastic spring for that premium bounce effect
const springTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
  mass: 1,
};

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: 10,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    transition: {
      ...springTransition,
      duration: 1.2,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    x: -100,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  rotateX: [0, 1, 0],
  rotateY: [0, 1, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  isVisible,
  locationKey = 'default'
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={locationKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ 
            perspective: 1000,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            animate={floatingAnimation}
            className="space-y-0"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Staggered item for children
export const StaggerItem: React.FC<{ children: ReactNode; index?: number }> = ({ 
  children, 
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 25,
          delay: index * 0.1,
        },
      }}
      whileHover={{ 
        scale: 1.02,
        y: -3,
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};

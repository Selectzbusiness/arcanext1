import React from 'react';
import { motion } from 'framer-motion';
import { shouldReduceMotion } from '../../lib/animations';

const SlideIn = ({ 
  children, 
  direction = 'left',
  delay = 0,
  duration = 0.5,
  className,
  ...props 
}) => {
  const reduceMotion = shouldReduceMotion();

  const directions = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    up: { y: 100, opacity: 0 },
    down: { y: -100, opacity: 0 },
  };

  const initial = reduceMotion 
    ? { opacity: 0 }
    : directions[direction];

  const animate = reduceMotion
    ? { opacity: 1 }
    : { x: 0, y: 0, opacity: 1 };

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ 
        duration: reduceMotion ? 0.01 : duration, 
        delay: reduceMotion ? 0 : delay,
        ease: 'easeOut'
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;

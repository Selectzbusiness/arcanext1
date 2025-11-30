import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const GradientOrb = ({
  position = 'center',
  size = 'large',
  color = 'brand',
  className,
  ...props
}) => {
  const positions = {
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
    'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
    'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
  };

  const sizes = {
    small: 'w-[300px] h-[300px]',
    medium: 'w-[500px] h-[500px]',
    large: 'w-[800px] h-[800px]',
    xlarge: 'w-[1200px] h-[1200px]',
  };

  const colors = {
    brand: 'from-brand-accent/30 via-brand-glow/10 to-transparent',
    blue: 'from-blue-600/30 via-cyan-500/10 to-transparent',
    purple: 'from-purple-600/30 via-pink-500/10 to-transparent',
  };

  return (
    <motion.div
      className={cn(
        'absolute pointer-events-none rounded-full blur-[100px]',
        'bg-gradient-radial',
        positions[position],
        sizes[size],
        colors[color] || colors.brand,
        className
      )}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      {...props}
    />
  );
};

export default GradientOrb;

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const GradientText = React.forwardRef(({ 
  className,
  gradient = 'purple-blue',
  animated = false,
  children,
  as: Component = 'span',
  ...props 
}, ref) => {
  const gradients = {
    'purple-blue': 'from-brand-purple-400 via-brand-purple-300 to-brand-blue-400',
    'purple-pink': 'from-brand-purple-400 via-pink-400 to-brand-purple-400',
    'blue-cyan': 'from-brand-blue-400 via-cyan-400 to-brand-blue-400',
    'green-emerald': 'from-green-400 via-emerald-400 to-green-400',
    'orange-red': 'from-orange-400 via-red-400 to-orange-400',
    'white': 'from-white via-purple-200 to-white',
  };

  const MotionComponent = motion[Component];

  return (
    <MotionComponent
      ref={ref}
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent font-bold',
        gradients[gradient],
        animated && 'bg-200% animate-gradient-shift',
        className
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  );
});

GradientText.displayName = 'GradientText';

export default GradientText;

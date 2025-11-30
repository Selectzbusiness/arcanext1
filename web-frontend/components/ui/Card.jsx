import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(({ 
  className,
  variant = 'default',
  hoverable = true,
  glowEffect = false,
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-background-secondary border-gray-800',
    elevated: 'bg-background-secondary border-gray-800 shadow-xl',
    gradient: 'bg-gradient-to-br from-background-secondary to-background-primary border-gray-800',
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-xl border text-white transition-all duration-300 relative overflow-hidden',
        variants[variant],
        hoverable && 'hover:border-brand-purple-500/50 hover:-translate-y-1',
        className
      )}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      {...props}
    >
      {/* Glow effect on hover */}
      {glowEffect && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 pointer-events-none" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
});

Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-400 leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn('p-6 pt-0', className)} 
    {...props} 
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

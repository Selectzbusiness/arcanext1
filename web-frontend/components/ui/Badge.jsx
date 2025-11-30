import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(({ 
  className,
  variant = 'default',
  pulse = false,
  icon,
  children,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-brand-purple-500/10 border-brand-purple-500/20 text-brand-purple-300',
    success: 'bg-green-500/10 border-green-500/20 text-green-300',
    warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    info: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
    gradient: 'bg-gradient-to-r from-brand-purple-500 to-brand-blue-500 border-transparent text-white',
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium backdrop-blur-sm',
        variants[variant],
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {pulse && (
        <motion.div
          className={cn(
            'w-2 h-2 rounded-full',
            variant === 'default' && 'bg-brand-purple-500',
            variant === 'success' && 'bg-green-500',
            variant === 'warning' && 'bg-yellow-500',
            variant === 'info' && 'bg-blue-500',
            variant === 'gradient' && 'bg-white'
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.div>
  );
});

Badge.displayName = 'Badge';

export default Badge;

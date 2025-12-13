import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  children,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-purple-600 to-brand-blue-600 hover:from-brand-purple-500 hover:to-brand-blue-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
    secondary: 'bg-background-secondary text-white hover:bg-background-tertiary border border-gray-700 hover:border-gray-600',
    outline: 'border-2 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 hover:border-brand-purple-500 hover:shadow-lg hover:shadow-purple-500/20',
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-800/50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;

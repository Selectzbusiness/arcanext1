// Animation configurations for Framer Motion

// Fade in from bottom
export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// Fade in from top
export const FADE_IN_DOWN = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// Fade in from left
export const FADE_IN_LEFT = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// Fade in from right
export const FADE_IN_RIGHT = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// Simple fade in
export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

// Scale up animation
export const SCALE_UP = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: 'easeOut' },
};

// Stagger container for child animations
export const STAGGER_CONTAINER = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Stagger container with faster timing
export const STAGGER_CONTAINER_FAST = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Scale on hover
export const SCALE_ON_HOVER = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
};

// Lift on hover (elevation effect)
export const LIFT_ON_HOVER = {
  whileHover: { y: -4, scale: 1.02 },
  transition: { duration: 0.2 },
};

// Gradient animation (for backgrounds)
export const GRADIENT_ANIMATION = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: 'linear',
  },
};

// Pulse animation
export const PULSE = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Float animation
export const FLOAT = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Rotate animation
export const ROTATE = {
  animate: {
    rotate: [0, 360],
  },
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};

// Slide in from bottom (for modals/drawers)
export const SLIDE_UP = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
  transition: { type: 'spring', damping: 25, stiffness: 300 },
};

// Tab indicator animation
export const TAB_INDICATOR = {
  transition: { type: 'spring', stiffness: 300, damping: 30 },
};

// Utility function to create stagger delay
export const getStaggerDelay = (index, baseDelay = 0.1) => {
  return index * baseDelay;
};

// Utility function to check if user prefers reduced motion
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation variants based on reduced motion preference
export const getAnimationVariants = (variants) => {
  if (shouldReduceMotion()) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.01 },
    };
  }
  return variants;
};

// Viewport animation config for scroll-triggered animations
export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.1,
  margin: '0px 0px -100px 0px',
};

// Spring animation config
export const SPRING_CONFIG = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Smooth spring config
export const SMOOTH_SPRING_CONFIG = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { shouldReduceMotion } from '../../lib/animations';

const FadeIn = ({ 
  children, 
  delay = 0,
  direction = 'up',
  duration = 0.5,
  threshold = 0.1,
  className,
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();
  const reduceMotion = shouldReduceMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  const initial = reduceMotion 
    ? { opacity: 0 }
    : { opacity: 0, ...directions[direction] };

  const animate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isVisible ? animate : initial}
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

export default FadeIn;

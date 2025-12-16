import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GradientText from '../ui/GradientText';
import FadeIn from '../animations/FadeIn';
import { STATS } from '../../lib/constants';
import { cn } from '../../lib/utils';

const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (hasAnimated || !isMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const startTime = Date.now();
          const endTime = startTime + duration * 1000;

          const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * value));

            if (now < endTime) {
              requestAnimationFrame(updateCount);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(updateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated, isMounted]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  // Prevent hydration mismatch by showing static value on server
  if (!isMounted) {
    return (
      <span ref={ref}>
        {prefix}
        {formatNumber(value)}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const gradients = [
    'from-green-500 to-emerald-500',
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-brand-purple-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={cn(
                  'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300',
                  gradients[i]
                )} />
                <div className="relative">
                  <div className={cn(
                    'text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent',
                    gradients[i]
                  )}>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Stats;

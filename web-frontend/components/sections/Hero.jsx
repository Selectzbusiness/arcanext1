import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Github, Play, Check, Zap, Lock } from 'lucide-react';
import Button from '../ui/Button';
import GradientOrb from '../animations/GradientOrb';

const Hero = () => {
  const router = useRouter();
  const [typedText, setTypedText] = useState('');
  const fullText = 'Your AI Security Engineer';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">

      {/* Background Elements are now global in UnifiedBackground */}

      {/* Gradient Orbs */}
      <GradientOrb position="center" size="xlarge" color="brand" className="opacity-20 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-gray-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            AI-Powered Security Scanning
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl"
        >
          <span className="block">{typedText}<motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-brand-accent"
          >
            |
          </motion.span></span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Stop vulnerabilities before they merge. Arcanext scans every pull request and provides <span className="text-white font-medium">one-click AI fixes</span> directly in GitHub.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 px-8 text-lg bg-white text-black hover:bg-gray-200 hover:text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
            icon={<Github className="w-5 h-5" />}
            onClick={() => router.push('/signin')}
          >
            Install GitHub App
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 hover:bg-white/5 hover:border-white/40 backdrop-blur-sm"
            icon={<Play className="w-5 h-5" />}
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Live Demo
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="pt-8 border-t border-white/5"
        >
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">Trusted by security teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos */}
            {['Acme Corp', 'TechStart', 'GlobalSystems', 'SecureNet'].map((company) => (
              <span key={company} className="text-xl font-bold text-white">{company}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

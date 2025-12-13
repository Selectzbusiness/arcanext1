import { motion } from 'framer-motion';
import { Github, ArrowRight, Shield, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

export default function OnboardingBanner({ onInstallClick, loading }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl mb-8"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-purple-600/20 to-cyan-600/30" />
      
      {/* Animated Glow Orbs */}
      <motion.div
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -left-20 w-60 h-60 bg-violet-500/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-500/30 rounded-full blur-3xl"
      />

      {/* Glass Border */}
      <div className="absolute inset-0 border border-white/20 rounded-3xl" />
      
      {/* Content */}
      <div className="relative backdrop-blur-xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Animated Icon */}
          <motion.div 
            className="flex-shrink-0"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              {/* Pulsing Glow */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-violet-500 rounded-2xl blur-2xl"
              />
              <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 p-5 rounded-2xl">
                <Shield className="w-14 h-14 text-violet-400" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-3 justify-center md:justify-start"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">
                Get Started
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight"
            >
              Welcome to Arcanext! 🎉
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 mb-6 max-w-xl text-lg leading-relaxed"
            >
              To start scanning your repositories for security vulnerabilities, 
              you need to install the Arcanext GitHub App. This gives us permission 
              to analyze your pull requests and provide AI-powered security fixes.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={onInstallClick}
                disabled={loading}
                className="bg-white hover:bg-gray-100 text-black font-semibold shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.6)] transition-all duration-300"
                size="lg"
              >
                <Github className="w-5 h-5 mr-2" />
                Install GitHub App
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

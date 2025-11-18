import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, GitBranch, Shield, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { stats } from '../data/mock';
import { EtherealShadow } from './ui/ethereal-shadow';
import { motion } from 'framer-motion';

const HeroWithBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.95, 1 - scrollY / 3000);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Ethereal Shadow Background */}
      <div 
        className="fixed top-0 left-0 w-full h-screen"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
          transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
        }}
      >
        <EtherealShadow
          color="rgba(147, 51, 234, 0.4)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 1, scale: 1.2 }}
          sizing="fill"
        >
          <div className="flex items-center justify-center h-full" />
        </EtherealShadow>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6 hover:bg-purple-500/20 transition-colors cursor-pointer backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Shield className="h-4 w-4 mr-2" />
              AI-Powered Security Scanning
            </motion.div>
            
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Your AI Security
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Engineer
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Stop vulnerabilities before they merge. Arcanext scans every pull request and provides one-click AI fixes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-purple-500/50">
                <Github className="mr-2 h-5 w-5" />
                Install Arcanext
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 px-8 py-6 text-lg backdrop-blur-sm">
                View Pricing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.p 
              className="text-sm text-gray-400 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Zap className="h-4 w-4 text-green-400" />
              Free for public repositories • No credit card required
            </motion.p>
          </motion.div>

          {/* Visual - Code Editor with AI Fix */}
          <motion.div
            className="max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="relative bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-[#161b22] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">vulnerability-fix.js</div>
                <div className="text-xs text-gray-500">Arcanext AI</div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 font-mono text-sm">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-red-400" />
                    <span className="text-red-400 font-semibold">SQL Injection Vulnerability Detected</span>
                  </div>
                  <div className="bg-red-500/10 border-l-4 border-red-500 p-3 rounded">
                    <p className="text-gray-400 text-xs mb-2">Line 42: Unsanitized user input in SQL query</p>
                    <code className="text-red-300">const query = `SELECT * FROM users WHERE id = ${userId}`;</code>
                  </div>
                </div>
                
                <div className="bg-green-500/10 border-l-4 border-green-500 p-3 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-green-400 animate-pulse" />
                    <span className="text-green-400 font-semibold">AI Auto-Fix Available</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">Using parameterized query to prevent SQL injection</p>
                  <code className="text-green-300">const query = 'SELECT * FROM users WHERE id = ?';<br/>db.query(query, [userId]);</code>
                </div>
              </div>
              
              {/* Action Footer */}
              <div className="bg-[#161b22] border-t border-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <GitBranch className="h-4 w-4" />
                  <span>Pull Request #1234</span>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white">
                  Apply Fix
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        style={{ opacity: Math.max(0, 1 - scrollY / 300) }}
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroWithBackground;
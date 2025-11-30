import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight, Shield } from 'lucide-react';
import Button from '../ui/Button';
import GradientOrb from '../animations/GradientOrb';
import { cn } from '../../lib/utils';

const CTA = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      {/* Global background handles this */}

      <GradientOrb position="center" size="xlarge" color="brand" className="opacity-20" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <motion.div
            className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Shield className="w-12 h-12 text-brand-accent" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-glow">
              Secure Your Code
            </span>
            ?
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who trust Arcanext to keep their code secure.
            Start scanning in under 60 seconds.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-lg bg-white text-black hover:bg-gray-200 hover:text-black shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
              icon={<Github className="w-5 h-5" />}
            >
              Install GitHub App
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-lg border-white/20 hover:bg-white/5"
            >
              Schedule Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>Free for public repos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
              <span>14-day free trial</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

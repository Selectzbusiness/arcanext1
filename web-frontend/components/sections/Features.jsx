import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';
import FadeIn from '../animations/FadeIn';
import { cn } from '../../lib/utils';
import { FEATURES } from '../../lib/constants';

const Features = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      {/* Grid is now global */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-20">
            <Badge variant="default" className="mb-6">
              Powerful Features
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Everything You Need to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-glow">
                Secure Your Code
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Comprehensive security tools designed for modern development teams who ship fast and secure.
            </p>
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
          {FEATURES.map((feature, index) => {
            const Icon = Icons[feature.icon];

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn("h-full", feature.className)}
              >
                <Card
                  className="group relative overflow-hidden bg-background-secondary border-white/5 hover:border-brand-accent/30 transition-all duration-500 h-full flex flex-col"
                  hoverable
                >
                  {/* Animated Background Gradient */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500',
                    feature.gradient
                  )} />

                  <CardHeader className="relative flex-1">
                    {/* Icon with Gradient Background */}
                    <div className="mb-6">
                      <div className={cn(
                        'inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300',
                      )}>
                        {Icon && <Icon className={cn("w-6 h-6", feature.gradient.split(' ')[1].replace('to-', 'text-'))} />}
                      </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                      {feature.title}
                    </CardTitle>

                    <CardDescription className="text-gray-400 leading-relaxed text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative mt-auto pt-0">
                    <div className={cn(
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300 group-hover:bg-brand-accent/10 group-hover:text-brand-accent group-hover:border-brand-accent/20 transition-all duration-300',
                    )}>
                      {feature.metric}
                    </div>
                  </CardContent>

                  {/* Hover Arrow */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <Icons.ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-20">
            <p className="text-gray-400 mb-6">
              Ready to see all features in action?
            </p>
            <button className="group inline-flex items-center gap-2 text-brand-accent hover:text-brand-glow font-semibold transition-colors text-lg">
              Explore Full Feature List
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Icons.ArrowRight className="w-5 h-5" />
              </motion.div>
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Features;

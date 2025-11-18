import React from 'react';
import { Shield, Users, Lock, Zap, BarChart3, Cloud } from 'lucide-react';
import { features } from '../data/mock';

const iconMap = {
  Shield,
  Users,
  Lock,
  Zap,
  BarChart3,
  Cloud
};

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> build amazing software</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powerful features that help teams collaborate, automate workflows, and ship code faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className="group p-6 bg-[#161b22] border border-gray-800 rounded-lg hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
import React from 'react';
import { Sparkles } from 'lucide-react';
import { aiFeatures } from '../data/mock';
import { Badge } from './ui/badge';

const AIFeatures = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d1117] to-[#0d1117]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            Powered by Advanced AI
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            AI-driven automation for
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              modern development
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let AI handle the repetitive tasks while you focus on building great products.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {aiFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative p-8 bg-[#161b22] border border-gray-800 rounded-xl hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <Sparkles className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-xl p-12">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to supercharge your workflow?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Experience the power of AI-driven development. Start building smarter, not harder.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all">
            Try AI Features Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;
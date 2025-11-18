import React from 'react';
import { ArrowRight, Code2, GitBranch, Users } from 'lucide-react';
import { Button } from './ui/button';
import { stats } from '../data/mock';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6 hover:bg-blue-500/20 transition-colors cursor-pointer">
            <Code2 className="h-4 w-4 mr-2" />
            Introducing AI-Powered Development
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Build, collaborate, and
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              ship faster
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            The complete developer platform to build, scale, and deliver secure software. 
            Trusted by millions of developers worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center bg-[#161b22] border border-gray-700 rounded-lg overflow-hidden w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none w-full sm:w-80"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium px-6 py-3 rounded-none h-full">
                Start free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Free for individual developers. No credit card required.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 p-4 bg-[#161b22] border border-gray-800 rounded-lg hover:border-blue-500/50 transition-colors group">
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Code2 className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-gray-300 font-medium">AI Code Assistant</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 p-4 bg-[#161b22] border border-gray-800 rounded-lg hover:border-purple-500/50 transition-colors group">
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
              <GitBranch className="h-6 w-6 text-purple-400" />
            </div>
            <span className="text-gray-300 font-medium">Version Control</span>
          </div>
          
          <div className="flex items-center justify-center space-x-3 p-4 bg-[#161b22] border border-gray-800 rounded-lg hover:border-green-500/50 transition-colors group">
            <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
              <Users className="h-6 w-6 text-green-400" />
            </div>
            <span className="text-gray-300 font-medium">Team Collaboration</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
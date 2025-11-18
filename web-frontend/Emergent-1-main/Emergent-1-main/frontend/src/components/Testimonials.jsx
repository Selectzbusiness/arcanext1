import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/mock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTestimonials = activeTab === 'all'
    ? testimonials
    : testimonials.filter(t => t.category.toLowerCase() === activeTab);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by developers
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent"> worldwide</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what teams are saying about Arcanext and how it transformed their development workflow.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-[#161b22] border border-gray-800">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              All Stories
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Enterprise
            </TabsTrigger>
            <TabsTrigger value="startup" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              Startup
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="group p-6 bg-[#161b22] border border-gray-800 rounded-xl hover:border-pink-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  <Quote className="h-8 w-8 text-pink-400 mb-4 opacity-50" />
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.logo}
                      alt={testimonial.company}
                      className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-gray-700 group-hover:border-pink-500/50 transition-colors"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Testimonials;
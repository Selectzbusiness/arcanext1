import React from 'react';
import { Plus } from 'lucide-react';
import { addons } from '../data/mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const Addons = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0d1117] to-[#161b22]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Extend your platform with
            <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent"> powerful add-ons</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enhance your workflow with specialized tools and features tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addons.map((addon) => (
            <Card
              key={addon.id}
              className="bg-[#161b22] border-gray-800 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 group"
            >
              <CardHeader>
                <div className="mb-4">
                  <div className="inline-flex p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                    <Plus className="h-6 w-6 text-orange-400" />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-white mb-2">
                  {addon.name}
                </CardTitle>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-white">{addon.price}</span>
                  {addon.period && (
                    <span className="text-gray-400 text-sm ml-1">/ {addon.period}</span>
                  )}
                </div>
                <CardDescription className="text-gray-400">
                  {addon.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {addon.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-center">
                      <span className="h-1.5 w-1.5 bg-orange-400 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  Add to Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Addons;
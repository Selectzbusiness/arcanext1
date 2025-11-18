import React from 'react';
import { Check } from 'lucide-react';
import { pricingPlans } from '../data/mock';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Choose the perfect plan for
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"> your team</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            From individual developers to enterprise teams, we have a plan that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`bg-[#161b22] border-gray-800 relative overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20' : 'hover:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400 text-sm ml-2">/ {plan.period}</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
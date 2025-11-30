import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import FadeIn from '../animations/FadeIn';
import { cn } from '../../lib/utils';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Open Source',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for public repositories and open source projects',
      features: [
        'Unlimited public repos',
        'AI-powered scanning',
        'Basic vulnerability detection',
        'Community support',
        'GitHub integration',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Professional',
      price: { monthly: 29, annual: 24 },
      description: 'For professional developers and small teams',
      features: [
        'Everything in Open Source',
        'Unlimited private repos',
        'One-click AI fixes',
        'Priority support',
        'Advanced analytics',
        'Custom rules',
        'API access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: { monthly: 99, annual: 79 },
      description: 'For large teams and organizations',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'SSO & SAML',
        'Dedicated support',
        'SLA guarantee',
        'Custom integrations',
        'On-premise deployment',
        'Compliance reports',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeIn>
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-6">
              Simple Pricing
            </Badge>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Start free, scale as you grow. All plans include our core security features.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 p-1 bg-background-secondary rounded-lg border border-gray-800">
              <button
                onClick={() => setIsAnnual(false)}
                className={cn(
                  'px-6 py-2 rounded-md font-medium transition-all',
                  !isAnnual
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={cn(
                  'px-6 py-2 rounded-md font-medium transition-all flex items-center gap-2',
                  isAnnual
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                Annual
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  'relative h-full flex flex-col',
                  plan.popular
                    ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105'
                    : 'border-gray-800'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="gradient" icon={<Sparkles className="w-3 h-3" />}>
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-gray-400 text-sm mt-2">{plan.description}</p>

                  <div className="mt-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className="text-gray-400">/month</span>
                      )}
                    </div>
                    {isAnnual && plan.price.monthly > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed annually (${plan.price.annual * 12}/year)
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full mb-6"
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <p className="text-gray-400">
              All plans include a 14-day free trial. No credit card required.{' '}
              <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                Compare plans
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Pricing;

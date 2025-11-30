import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Badge from '../ui/Badge';
import FadeIn from '../animations/FadeIn';
import { TESTIMONIALS } from '../../lib/constants';
import { cn } from '../../lib/utils';

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Elements */}
            {/* Grid is global */}

            <div className="max-w-7xl mx-auto relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <Badge variant="default" className="mb-6">
                            Social Proof
                        </Badge>

                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                            Trusted by Leading{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-glow">
                                Engineering Teams
                            </span>
                        </h2>

                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of developers who rely on Arcanext to ship secure code faster.
                        </p>
                    </div>
                </FadeIn>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-background-secondary border border-white/5 p-8 rounded-2xl hover:border-brand-accent/30 transition-all duration-300"
                        >
                            <div className="absolute top-8 right-8 text-brand-accent/20 group-hover:text-brand-accent/40 transition-colors">
                                <Quote className="w-10 h-10" />
                            </div>

                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <p className="text-lg text-gray-300 mb-8 leading-relaxed relative z-10">
                                &quot;{testimonial.content}&quot;
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent/20 group-hover:border-brand-accent transition-colors">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-500">{testimonial.role} at <span className="text-brand-accent">{testimonial.company}</span></p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

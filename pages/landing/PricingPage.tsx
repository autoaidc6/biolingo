import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

export const PricingPage: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-brand-snow">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-brand-text uppercase tracking-tight">Choose Your Plan</h2>
          <p className="text-gray-400 font-bold mt-4 tracking-widest uppercase text-sm">Select the plan that fits your learning goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-white border-2 border-brand-stroke p-10 h-full flex flex-col border-b-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black text-brand-text">Free Version</h3>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">Limited to 10 mins per day</p>
                </div>
                <span className="text-4xl font-black text-brand-text">$0</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Basic Lessons', 'Flashcards Access', 'Limited AI Chat', 'Web & Mobile'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                    <div className="w-5 h-5 rounded-full bg-brand-stroke flex items-center justify-center text-[10px] text-gray-400">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="primary" fullWidth size="lg" className="bg-brand-purple border-brand-purple/80">Start For Free</Button>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-brand-purple text-white p-10 h-full flex flex-col border-b-8 border-brand-purple/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-brand-yellow text-brand-text font-black text-[10px] uppercase tracking-widest -rotate-0 rounded-bl-xl">Best Value</div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black">Complete Access</h3>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-widest mt-1">Unlimited sessions</p>
                </div>
                <div className="text-right">
                   <span className="text-4xl font-black">$4.99</span>
                   <p className="text-[10px] font-bold opacity-70 uppercase">/MONTH</p>
                </div>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {['Unlimited AI Tutoring', 'All 100+ Lessons', 'Advanced Voice Mode', 'Offline Downloads', 'Priority Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" fullWidth className="bg-white text-brand-purple border-white hover:bg-white/90">Get Full Access Now</Button>
              <p className="text-center text-[10px] font-bold mt-4 opacity-70 uppercase tracking-widest">7 day free trial. Cancel anytime.</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

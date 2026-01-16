import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

export const PricingPage: React.FC = () => {
  const freeFeatures = [
    'Basic Lessons',
    'Flashcards Access',
    'Limited AI Chat',
    'Web & Mobile'
  ];

  const premiumFeatures = [
    'Unlimited AI Tutoring',
    'All 100+ Lessons',
    'Advanced Voice Mode',
    'Offline Downloads',
    'Priority Support'
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-brand-text uppercase tracking-tight mb-4">Choose Your Plan</h2>
          <p className="text-gray-400 font-bold tracking-widest uppercase text-sm">Select the plan that fits your learning goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex"
          >
            <Card className="bg-white border-2 border-brand-stroke p-10 flex flex-col w-full shadow-soft rounded-3xl border-b-8 relative">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-3xl font-black text-brand-text">Free Version</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Limited to 10 mins per day</p>
                </div>
                <span className="text-4xl font-black text-brand-text">$0</span>
              </div>

              <div className="mt-10 space-y-5 flex-grow">
                {freeFeatures.map(item => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-brand-stroke flex items-center justify-center text-[10px] text-gray-500 font-bold">✓</div>
                    <span className="text-sm font-black text-slate-600 uppercase tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button fullWidth size="lg" className="bg-brand-green border-brand-green-dark hover:brightness-105 active:brightness-95">
                  Start For Free
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex"
          >
            <Card className="bg-white border-2 border-cyan-200 p-10 flex flex-col w-full shadow-soft rounded-3xl border-b-8 relative overflow-hidden">
              <div className="absolute top-0 right-0">
                 <div className="bg-brand-yellow text-brand-text font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-bl-xl shadow-sm">
                   Best Value
                 </div>
              </div>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-3xl font-black text-brand-text">Complete Access</h3>
                  <p className="text-[10px] font-black text-brand-purple uppercase tracking-widest mt-1">Unlimited sessions</p>
                </div>
                <div className="text-right">
                   <span className="text-4xl font-black text-brand-text">$4.99</span>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">/ Month</p>
                </div>
              </div>

              <div className="mt-10 space-y-5 flex-grow">
                {premiumFeatures.map(item => (
                  <div key={item} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center text-[10px] text-brand-purple font-bold">✓</div>
                    <span className="text-sm font-black text-slate-600 uppercase tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button fullWidth size="lg" className="bg-brand-green border-brand-green-dark hover:brightness-105 active:brightness-95">
                  Get Full Access Now
                </Button>
                <p className="text-center text-[9px] font-bold mt-4 text-gray-400 uppercase tracking-widest">7 day free trial. Cancel anytime.</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
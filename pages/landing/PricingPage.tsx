import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

export const PricingPage: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-brand-snow">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-brand-text uppercase tracking-tighter">The Path to Mastery</h2>
          <p className="text-slate-400 font-bold mt-4 tracking-widest uppercase text-sm">Flexible options for every evolutionary stage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {/* Free Plan */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="bg-white border-2 border-brand-stroke p-12 h-full flex flex-col border-b-[12px]">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-black text-brand-text">Basic Bio</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">15 Mins Daily Limit</p>
                </div>
                <span className="text-5xl font-black text-brand-text">$0</span>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {['Core Vocabulary', 'Visual Scanning', 'Basic AI Tutor', 'Mobile Access'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-brand-purple">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="outline" fullWidth size="lg" className="border-brand-purple text-brand-purple hover:bg-brand-purple/5">Get Started</Button>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="bg-brand-purple text-white p-12 h-full flex flex-col border-b-[12px] border-brand-green relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-brand-yellow text-brand-text font-black text-[10px] uppercase tracking-widest rounded-bl-xl shadow-lg">Recommended</div>
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-black">Full Access</h3>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em] mt-2">Unlimited Evolution</p>
                </div>
                <div className="text-right">
                   <span className="text-5xl font-black">$4.99</span>
                   <p className="text-[10px] font-bold opacity-70 uppercase mt-1">/ Monthly</p>
                </div>
              </div>
              <ul className="space-y-5 mb-12 flex-grow">
                {['Unlimited AI Tutoring', 'Advanced Social Debates', 'Neural Spaced Repetition', 'Offline Ecosystem', 'No Interruptions'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-bold">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" fullWidth className="bg-white text-brand-purple border-white hover:brightness-105 shadow-xl">Level Up Now</Button>
              <p className="text-center text-[9px] font-bold mt-6 opacity-60 uppercase tracking-[0.3em]">Start your 7-day trial. Zero commitment.</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

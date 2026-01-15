import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Mascot } from '../../components/ui/Mascot';
import { FeaturesPage } from './FeaturesPage';

export const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-purple/5 -z-10 blur-3xl"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-brand-text leading-[1.1] tracking-tighter"
            >
              Unlock the Beauty of <span className="text-brand-purple">Spanish</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 mt-8 font-medium leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              Learn Spanish naturally with our interactive lessons, authentic dialogues, and personalized learning paths.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link to="/login">
                <Button size="lg" className="bg-brand-purple border-brand-purple/80 px-10">Get Started Now</Button>
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />)}
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">60+ Lessons Available</span>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 flex justify-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="relative z-10"
            >
              <Mascot size={320} expression="happy" showBubble="¡VAMOS!" />
            </motion.div>
            <div className="absolute inset-0 bg-brand-purple/10 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>

      <FeaturesPage />

      {/* Call to Action Section */}
      <section className="bg-brand-snow py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-brand-text mb-6">Ready to start your journey?</h2>
            <p className="text-lg text-slate-500 font-bold mb-10">Join Ustaza and master Spanish today.</p>
            <Link to="/login">
               <Button size="lg" className="px-12">Create Free Account</Button>
            </Link>
        </div>
      </section>
    </div>
  );
};
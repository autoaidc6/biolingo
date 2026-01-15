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
      <section className="pt-24 pb-40 px-6 relative bg-gradient-to-b from-brand-snow to-white">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-purple/5 -z-10 blur-[120px]"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-black uppercase tracking-widest mb-8 border border-brand-purple/20"
            >
              The Next Evolution
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-brand-text leading-[0.95] tracking-tighter"
            >
              Master <span className="text-brand-purple underline decoration-brand-yellow/30">Spanish</span> Naturally
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-500 mt-10 font-medium leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              Biolingo is the first platform to use cognitive-adaptive AI to match your unique learning pace.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
            >
              <Link to="/login">
                <Button size="lg" className="bg-brand-purple border-brand-purple/80 px-12 py-5 shadow-xl shadow-brand-purple/20">Start Evolution</Button>
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3">
                   {[1,2,3,4].map(i => <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 shadow-sm" />)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-brand-text">10K+ Peers</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Learners</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex-1 flex justify-center relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="relative z-10"
            >
              <Mascot size={360} expression="happy" showBubble="HOLA! EVOLVE." />
            </motion.div>
            <div className="absolute inset-0 bg-brand-blue/10 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>

      <FeaturesPage />

      {/* Dark Modern Section */}
      <section className="bg-brand-text py-32 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-black mb-8 tracking-tighter">Adaptive. Intelligent. Biological.</h2>
            <p className="text-slate-400 text-lg font-medium mb-12 max-w-2xl mx-auto">
              Our neural models track your retention in real-time, ensuring you never repeat what you already know.
            </p>
            <Link to="/login">
               <Button size="lg" className="px-16 bg-brand-yellow text-brand-text border-brand-yellow">Get Started Free</Button>
            </Link>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Visual Cognition',
    description: 'Scan your surroundings and translate instantly with our neural camera.',
    icon: '📸',
    color: 'bg-emerald-50 border-emerald-100',
    iconColor: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Adaptive Spacing',
    description: 'Flashcards that intelligently appear just as you are about to forget.',
    icon: '🧠',
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'AI Vocalization',
    description: 'Natural, expressive AI voices that teach perfect pronunciation.',
    icon: '🗣️',
    color: 'bg-indigo-50 border-indigo-100',
    iconColor: 'bg-indigo-100 text-indigo-600'
  },
  {
    title: 'Social Learning',
    description: 'Participate in AI-moderated debates to hone your conversation skills.',
    icon: '⚖️',
    color: 'bg-teal-50 border-teal-100',
    iconColor: 'bg-teal-100 text-teal-600'
  }
];

export const FeaturesPage: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-brand-text tracking-tight uppercase leading-none">Why Biolingo?</h2>
          <p className="text-slate-400 font-bold mt-6 tracking-[0.2em] uppercase text-sm">Engineered for deep neurological retention.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`${f.color} h-full flex flex-col items-center text-center p-10 border-b-8 hover:translate-y-[-8px] transition-all`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm ${f.iconColor}`}>
                  {f.icon}
                </div>
                <h3 className="font-extrabold text-xl text-brand-text leading-tight mb-4">{f.title}</h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">{f.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

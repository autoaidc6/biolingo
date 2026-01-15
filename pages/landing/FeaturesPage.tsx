import React from 'react';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Learn with Flashcards',
    description: 'Swipe through everyday Spanish words & phrases to build your vocabulary.',
    icon: '📖',
    color: 'bg-purple-50 border-purple-100',
    iconColor: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Interactive Lessons',
    description: 'Build fluency with reading, matching, and quick quiz sessions.',
    icon: '🎯',
    color: 'bg-brand-yellow/5 border-brand-yellow/10',
    iconColor: 'bg-brand-yellow/10 text-brand-yellow'
  },
  {
    title: 'Chat with an AI Tutor',
    description: 'Speak with Ustaza, your personal AI language partner, anytime.',
    icon: '💬',
    color: 'bg-brand-green/5 border-brand-green/10',
    iconColor: 'bg-brand-green/10 text-brand-green'
  },
  {
    title: 'Scan & Discover',
    description: 'Instantly translate signs and menus from the real world with your camera.',
    icon: '📸',
    color: 'bg-brand-blue/5 border-brand-blue/10',
    iconColor: 'bg-brand-blue/10 text-brand-blue'
  }
];

export const FeaturesPage: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-brand-text tracking-tight uppercase">Four Ways to Master Spanish</h2>
          <p className="text-gray-400 font-bold mt-4 tracking-widest uppercase text-sm">Modern, interactive pathways — all in one platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`${f.color} h-full flex flex-col items-center text-center p-8 border-b-4 hover:scale-[1.02] transition-transform`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 ${f.iconColor}`}>
                  {f.icon}
                </div>
                <h3 className="font-extrabold text-lg text-brand-text leading-tight mb-4">{f.title}</h3>
                <p className="text-sm font-medium text-gray-500 leading-relaxed">{f.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

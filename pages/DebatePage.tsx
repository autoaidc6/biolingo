import React from 'react';
import { Card } from '../components/ui/Card';
import { DEBATE_TOPICS } from '../constants';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const DebatePage: React.FC = () => {
  return (
    <div className="space-y-10 pb-20 pt-4">
      <header className="max-w-4xl">
        <h1 className="text-5xl font-black text-brand-text tracking-tight uppercase">Debate</h1>
        <p className="text-slate-500 font-bold mt-4 leading-relaxed text-lg">
          In Debate Mode, you'll practise forming arguments in Spanish. Select a topic and choose whether you support or oppose the idea.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DEBATE_TOPICS.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/debate/${topic.id}`}>
              <Card className="p-0 overflow-hidden relative aspect-[1.5/1] group cursor-pointer border-b-8 shadow-sm hover:shadow-xl transition-all rounded-[32px] border-2 border-brand-stroke">
                <img 
                  src={topic.image} 
                  alt={topic.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-white font-black text-lg leading-tight group-hover:text-brand-purple transition-colors">
                    {topic.title}
                  </h3>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
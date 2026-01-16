import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { DEBATE_TOPICS } from '../constants';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const DebateTopicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const topic = DEBATE_TOPICS.find(t => t.id === id);

  if (!topic) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-black text-brand-text">Topic not found</h1>
        <Button onClick={() => navigate('/debate')} className="mt-8">Back to Debates</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <header className="flex items-center gap-2 mb-8 group">
        <button onClick={() => navigate(-1)} className="text-slate-400 font-black flex items-center gap-2 hover:text-brand-purple transition-colors">
          <span className="text-2xl">←</span> BACK
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-grow space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[40px] overflow-hidden border-2 border-brand-stroke shadow-2xl border-b-[10px]"
          >
            <img src={topic.image} alt={topic.title} className="w-full aspect-video object-cover" />
          </motion.div>

          <div className="space-y-6">
            <h1 className="text-5xl font-black text-brand-text tracking-tighter leading-none">{topic.title}</h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              {topic.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to={`/debate/${topic.id}/for`} className="flex-1">
                <Button fullWidth className="bg-brand-purple border-brand-purple/80 hover:brightness-105 active:brightness-95 h-16 text-lg tracking-widest">
                  ARGUE FOR
                </Button>
              </Link>
              <Link to={`/debate/${topic.id}/against`} className="flex-1">
                <Button fullWidth className="bg-brand-purple border-brand-purple/80 hover:brightness-105 active:brightness-95 h-16 text-lg tracking-widest">
                  ARGUE AGAINST
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <aside className="w-full lg:w-96 space-y-6">
          <Card className="border-2 border-brand-stroke rounded-[40px] border-b-[8px] p-8 space-y-6 sticky top-24">
            <div className="w-12 h-12 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple text-2xl">
              📣
            </div>
            <div>
              <h3 className="text-xl font-black text-brand-text mb-4 uppercase tracking-tight">Debate Mode</h3>
              <p className="text-sm font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                Debates let you argue both sides of fascinating topics. Sharpen your language skills while defending your points against a knowledgeable AI.
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
};
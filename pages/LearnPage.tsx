import React from 'react';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const topics = [
  { id: 'colours-foundations', title: 'Colours', icon: '🎨', level: 'Beginner', bg: 'bg-indigo-50', lessonId: 'col-1' },
  { id: 'food-and-drink', title: 'Food', icon: '🍔', level: 'Beginner', bg: 'bg-orange-50', lessonId: 'fd1' },
  { id: '3', title: 'Common Verbs', icon: '🏃', level: 'Beginner', bg: 'bg-blue-50', lessonId: '' },
  { id: '4', title: 'Body Parts', icon: '🧍', level: 'Beginner', bg: 'bg-amber-50', lessonId: '' },
  { id: '5', title: 'Clothing', icon: '👕', level: 'Beginner', bg: 'bg-red-50', lessonId: '' },
  { id: '6', title: 'Places around town', icon: '🏙️', level: 'Beginner', bg: 'bg-teal-50', lessonId: '' },
  { id: '7', title: 'Emotions', icon: '😄', level: 'Beginner', bg: 'bg-rose-50', lessonId: '' },
  { id: '8', title: 'Household Items', icon: '🏠', level: 'Beginner', bg: 'bg-stone-50', lessonId: '' },
  { id: '9', title: 'Weather and Seasons', icon: '🌦️', level: 'Beginner', bg: 'bg-sky-50', lessonId: '' },
  { id: '10', title: 'Occupations', icon: '👨‍⚕️', level: 'Beginner', bg: 'bg-emerald-50', lessonId: '' },
];

export const LearnPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-brand-stroke pb-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-brand-text tracking-tight uppercase">Learn</h1>
          <p className="text-slate-400 font-bold mt-4 leading-relaxed text-lg">
            Master everyday Spanish expressions with flashcards covering different scenarios, designed to make learning engaging and effective.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-4">
          <div className="relative group">
            <select className="appearance-none bg-white border-2 border-brand-stroke rounded-2xl pl-6 pr-12 py-3 font-black text-sm text-brand-text focus:outline-none focus:ring-4 focus:ring-brand-purple/10 transition-all cursor-pointer">
              <option>Proficiency Level</option>
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={topic.lessonId ? `/lesson/${topic.lessonId}` : `/course/${topic.id}`}>
              <Card className={`p-0 overflow-hidden border-b-[10px] hover:translate-y-[-8px] transition-all group shadow-sm hover:shadow-xl`}>
                <div className={`h-44 ${topic.bg} flex items-center justify-center text-7xl transition-all group-hover:scale-110 group-active:scale-95`}>
                  {topic.icon}
                </div>
                <div className="p-6 relative bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-brand-green/10 text-brand-green text-[9px] font-black px-2.5 py-1 rounded-md uppercase border border-brand-green/20">
                      {topic.level}
                    </span>
                  </div>
                  <h3 className="font-black text-brand-text text-lg leading-tight group-hover:text-brand-purple transition-colors">{topic.title}</h3>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
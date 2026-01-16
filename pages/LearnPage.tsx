import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const topics = [
  { id: 'colours-foundations', title: 'Colours', icon: '🎨', level: 'Beginner', bg: 'bg-indigo-50', lessonId: 'col-1' },
  { id: 'food-and-drink', title: 'Food', icon: '🍔', level: 'Beginner', bg: 'bg-orange-50', lessonId: 'fd1' },
  { id: 'common-verbs', title: 'Common Verbs', icon: '🏃', level: 'Intermediate', bg: 'bg-blue-50', lessonId: 'verb-1' },
  { id: 'body-parts', title: 'Body Parts', icon: '🧍', level: 'Beginner', bg: 'bg-amber-50', lessonId: 'body-1' },
  { id: 'clothing', title: 'Clothing', icon: '👕', level: 'Beginner', bg: 'bg-red-50', lessonId: 'cloth-1' },
  { id: 'places-town', title: 'Places around town', icon: '🏙️', level: 'Intermediate', bg: 'bg-teal-50', lessonId: 'town-1' },
  { id: 'emotions', title: 'Emotions', icon: '😄', level: 'Advanced', bg: 'bg-rose-50', lessonId: 'emot-1' },
  { id: 'household-items', title: 'Household Items', icon: '🏠', level: 'Beginner', bg: 'bg-stone-50', lessonId: 'house-1' },
  { id: 'weather-seasons', title: 'Weather and Seasons', icon: '🌦️', level: 'Intermediate', bg: 'bg-sky-50', lessonId: 'weather-1' },
  { id: 'occupations', title: 'Occupations', icon: '👨‍⚕️', level: 'Advanced', bg: 'bg-emerald-50', lessonId: 'job-1' },
];

export const LearnPage: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState('All Levels');

  const filteredTopics = topics.filter(topic => 
    filterLevel === 'All Levels' || topic.level === filterLevel
  );

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
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="appearance-none bg-white border-2 border-brand-stroke rounded-2xl pl-6 pr-12 py-3 font-black text-sm text-brand-text focus:outline-none focus:ring-4 focus:ring-brand-purple/10 transition-all cursor-pointer"
            >
              <option value="All Levels">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              layout
            >
              <Link to={topic.lessonId ? `/lesson/${topic.lessonId}` : `/course/${topic.id}`}>
                <Card className={`p-0 overflow-hidden border-b-[10px] hover:translate-y-[-8px] transition-all group shadow-sm hover:shadow-xl`}>
                  <div className={`h-44 ${topic.bg} flex items-center justify-center text-7xl transition-all group-hover:scale-110 group-active:scale-95`}>
                    {topic.icon}
                  </div>
                  <div className="p-6 relative bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase border ${
                        topic.level === 'Beginner' ? 'bg-brand-green/10 text-brand-green border-brand-green/20' :
                        topic.level === 'Intermediate' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' :
                        'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20'
                      }`}>
                        {topic.level}
                      </span>
                    </div>
                    <h3 className="font-black text-brand-text text-lg leading-tight group-hover:text-brand-purple transition-colors">{topic.title}</h3>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
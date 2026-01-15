import React from 'react';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const topics = [
  { id: '1', title: 'Colours', icon: '🎨', level: 'Beginner', bg: 'bg-indigo-50' },
  { id: '2', title: 'Food', icon: '🍔', level: 'Beginner', bg: 'bg-orange-50' },
  { id: '3', title: 'Common Verbs', icon: '🏃', level: 'Beginner', bg: 'bg-blue-50' },
  { id: '4', title: 'Body Parts', icon: '🧍', level: 'Beginner', bg: 'bg-amber-50' },
  { id: '5', title: 'Clothing', icon: '👕', level: 'Beginner', bg: 'bg-red-50' },
  { id: '6', title: 'Places around town', icon: '🏙️', level: 'Beginner', bg: 'bg-teal-50' },
  { id: '7', title: 'Emotions', icon: '😄', level: 'Beginner', bg: 'bg-rose-50' },
  { id: '8', title: 'Household Items', icon: '🏠', level: 'Beginner', bg: 'bg-stone-50' },
  { id: '9', title: 'Weather and Seasons', icon: '🌦️', level: 'Beginner', bg: 'bg-sky-50' },
  { id: '10', title: 'Occupations', icon: '👨‍⚕️', level: 'Beginner', bg: 'bg-emerald-50' },
];

export const LearnPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-text">Learn</h1>
          <p className="text-gray-500 font-medium mt-2 max-w-2xl">
            Master everyday Spanish expressions with flashcards covering different scenarios, designed to make learning engaging and effective.
          </p>
        </div>
        <div className="flex-shrink-0">
          <select className="bg-white border-2 border-brand-stroke rounded-xl px-4 py-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple">
            <option>Proficiency Level</option>
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link to={`/course/spanish-foundations-1`}>
              <Card className={`p-0 overflow-hidden border-b-4 hover:translate-y-[-4px] transition-all group`}>
                <div className={`h-40 ${topic.bg} flex items-center justify-center text-6xl group-hover:scale-110 transition-transform`}>
                  {topic.icon}
                </div>
                <div className="p-4 relative">
                  <span className="absolute -top-3 right-3 bg-brand-green text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                    {topic.level}
                  </span>
                  <h3 className="font-extrabold text-brand-text text-sm leading-tight mt-1">{topic.title}</h3>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

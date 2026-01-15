import React from 'react';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: "Ali Fareed",
    role: "Software Engineer",
    text: "Biolingo's ability to hold a two-way debate in Spanish was truly a refreshing experience for someone learning the language without being around native speakers. Highly recommend!",
    stars: 5
  },
  {
    name: "Nardin Mohamed",
    role: "Mathematics Teacher",
    text: "Kalam is a useful platform that helps me understand and learn commonly used terms, especially through real-life scenarios, everyday phrases, and essential verbs. The quick quizzes help check my understanding, making the learning process more interactive and effective.",
    stars: 5
  },
  {
    name: "Nadia Ali",
    role: "Data Analyst",
    text: "Biolingo offers a fun and interactive way to learn Spanish without the need for a tutor. As a visual and auditory learner, I really enjoy the videos and songs—they make it easy to pick up new vocabulary. The flashcards are also a great tool. I'm excited to continue improving!",
    stars: 5
  }
];

export const TestimonialsPage: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-brand-snow">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-brand-text tracking-tight uppercase">Success Stories</h2>
          <p className="text-gray-400 font-bold mt-4 tracking-widest uppercase text-sm">Hear from our students who have transformed their Spanish journey with Biolingo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-white border-2 border-brand-stroke p-8 border-b-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} className="text-brand-yellow text-lg">★</span>
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-500 leading-relaxed italic mb-8 flex-grow">
                  "{r.text}"
                </p>
                <div className="pt-6 border-t border-brand-stroke flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-brand-snow border border-brand-stroke flex items-center justify-center font-bold text-gray-400 uppercase text-xs">
                     {r.name.charAt(0)}
                   </div>
                   <div>
                     <h4 className="font-extrabold text-brand-text leading-none">{r.name}</h4>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{r.role}</p>
                   </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

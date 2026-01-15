import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/Card';

const faqs = [
  {
    q: "What is Biolingo?",
    a: "Biolingo is a fun, modern language learning platform that uses AI to help you master Spanish through interactive lessons, real-world scanning, and conversational practice."
  },
  {
    q: "How often should I use Biolingo?",
    a: "We recommend at least 10-15 minutes a day. Consistency is the key to language acquisition! Our daily streak system helps keep you motivated."
  },
  {
    q: "Is the AI tutor safe and accurate?",
    a: "Yes! Ustaza AI is powered by the latest Gemini models and is specifically tuned to be a supportive language tutor. It's designed for educational purposes."
  },
  {
    q: "How do I reset my progress?",
    a: "You can reset your account progress at any time from the Profile settings section of the app."
  },
  {
    q: "What plans does Biolingo offer?",
    a: "We offer a Free version for casual learners and a Complete Access plan for $4.99/mo for those who want unlimited AI practice and advanced features."
  }
];

const FAQItem: React.FC<{ faq: typeof faqs[0] }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-stroke last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-extrabold transition-colors ${isOpen ? 'text-brand-purple' : 'text-brand-text group-hover:text-brand-purple'}`}>
          {faq.q}
        </span>
        <span className={`text-2xl font-light transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-gray-500 font-medium leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQPage: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-brand-purple tracking-tighter">Frequently Asked Questions</h2>
          <p className="text-gray-400 font-bold mt-4 tracking-widest uppercase text-sm">Get answers to common questions about Biolingo.</p>
        </div>

        <Card className="bg-white shadow-soft p-10 border-b-8">
           {faqs.map((faq) => (
             <FAQItem key={faq.q} faq={faq} />
           ))}
        </Card>
      </div>
    </section>
  );
};

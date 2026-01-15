import React from 'react';
import { Mascot } from './ui/Mascot';
import { motion } from 'framer-motion';

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-brand-green flex flex-col items-center justify-center z-50 animate-fadeOut">
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
        .animate-fadeOut {
          animation: fadeOut 2.5s forwards;
        }
      `}</style>
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <Mascot size={160} showBubble="¡Hola!" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-extrabold text-white tracking-tight"
        >
          Biolingo
        </motion.h1>
      </div>
    </div>
  );
};

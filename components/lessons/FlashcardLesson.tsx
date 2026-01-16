import React, { useState } from 'react';
import { Flashcard } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerIcon } from '../ui/Icons';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';

interface FlashcardLessonProps {
  title: string;
  cards: Flashcard[];
  onComplete: () => void;
  onClose: () => void;
}

export const FlashcardLesson: React.FC<FlashcardLessonProps> = ({ title, cards, onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentCard = cards[currentIndex];
  const { togglePlay, isPlaying, isLoading: isAudioLoading } = useTextToSpeech(currentCard.term);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    // In a real app we would shuffle the array
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 py-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-brand-text">{title}</h2>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Progress: <span className="text-brand-purple">{currentIndex + 1}/{cards.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="primary" className="bg-brand-blue border-brand-blue-dark">
             <span className="mr-2">📄</span> Quiz
          </Button>
          <button className="p-2 bg-white border-2 border-brand-stroke rounded-xl text-slate-400 hover:text-brand-purple">⚙️</button>
          <button onClick={onClose} className="p-2 bg-white border-2 border-brand-stroke rounded-xl text-slate-400 hover:text-brand-red">✕</button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full bg-brand-purple/10 rounded-full h-2 mb-10 overflow-hidden">
        <motion.div 
          className="bg-brand-purple h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Flashcard Container */}
      <div className="flex-grow flex items-center justify-center relative perspective-1000 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isFlipped}`}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-2xl aspect-[1.6/1]"
          >
            <Card 
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer select-none bg-white border-brand-stroke border-b-8 shadow-soft relative p-12 overflow-hidden"
            >
              <div className="absolute top-6 left-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {isFlipped ? 'Translation' : 'Flip'}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }} 
                className={`absolute top-6 right-8 text-2xl transition-colors ${isFavorite ? 'text-brand-yellow' : 'text-slate-200 hover:text-brand-yellow'}`}
              >
                {isFavorite ? '★' : '☆'}
              </button>

              <h3 className={`text-center font-black transition-all ${isFlipped ? 'text-4xl text-slate-600' : 'text-6xl text-brand-text'}`}>
                {isFlipped ? currentCard.translation : currentCard.term}
              </h3>

              {isFlipped && (
                <p className="mt-6 text-sm font-bold text-slate-400 uppercase tracking-widest">{currentCard.term}</p>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <footer className="mt-10 py-8 flex items-center justify-between">
        <button onClick={handleShuffle} className="p-3 text-slate-400 hover:text-brand-purple transition-all hover:scale-110">
          <span className="text-xl">🔀</span>
        </button>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full border-2 border-brand-purple text-brand-purple flex items-center justify-center hover:bg-brand-purple/5 disabled:opacity-30 transition-all"
          >
            ←
          </button>
          
          <button 
            onClick={togglePlay}
            disabled={isAudioLoading}
            className={`w-14 h-14 rounded-full bg-brand-text text-white flex items-center justify-center shadow-lg transform active:scale-95 transition-all ${isPlaying ? 'bg-brand-purple' : ''}`}
          >
            {isAudioLoading ? '...' : <SpeakerIcon className="w-6 h-6" />}
          </button>

          <button 
            onClick={handleNext}
            className="w-12 h-12 rounded-full border-2 border-brand-purple text-brand-purple flex items-center justify-center hover:bg-brand-purple/5 transition-all"
          >
            →
          </button>
        </div>

        <button onClick={() => setCurrentIndex(0)} className="p-3 text-slate-400 hover:text-brand-purple transition-all hover:scale-110">
          <span className="text-xl">🔄</span>
        </button>
      </footer>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};
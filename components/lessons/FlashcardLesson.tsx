import React, { useState, useMemo } from 'react';
import { Flashcard, QuizQuestion } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeakerIcon, StopIcon } from '../ui/Icons';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { QuizLesson } from './QuizLesson';

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
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const currentCard = cards[currentIndex];
  const { togglePlay, isPlaying, isLoading: isAudioLoading } = useTextToSpeech(currentCard.term);

  // Generate dynamic quiz questions based on the flashcards
  const generatedQuestions = useMemo(() => {
    return cards.map((card, idx) => {
      const distractors = cards
        .filter((_, i) => i !== idx)
        .map(c => c.translation)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const options = [...distractors, card.translation].sort(() => Math.random() - 0.5);
      
      return {
        question: `What is the translation of "${card.term}"?`,
        options,
        correctAnswer: card.translation
      } as QuizQuestion;
    });
  }, [cards]);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      if (autoPlay) setTimeout(togglePlay, 500);
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

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    // In a real app we would shuffle the array, for now just jump to random
    const randomIndex = Math.floor(Math.random() * cards.length);
    setCurrentIndex(randomIndex);
    setIsFlipped(false);
  };

  if (isQuizMode) {
    return (
      <div className="p-6 h-full flex flex-col">
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-brand-text">Quiz: {title}</h2>
          <button onClick={() => setIsQuizMode(false)} className="p-2 bg-white border-2 border-brand-stroke rounded-xl text-slate-400 font-bold px-4">Exit Quiz</button>
        </header>
        <QuizLesson questions={generatedQuestions} onComplete={() => setIsQuizMode(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-4 py-6">
      {/* Header - Matching the Screenshot */}
      <header className="flex items-center justify-between mb-10">
        <div className="flex flex-col">
          <h2 className="text-3xl font-black text-brand-text leading-tight">{title}</h2>
          <p className="text-sm font-black text-slate-400 uppercase tracking-widest mt-1">
            PROGRESS: <span className="text-brand-purple">{currentIndex + 1}/{cards.length}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            size="sm" 
            onClick={() => setIsQuizMode(true)}
            className="bg-brand-green border-brand-green-dark hover:brightness-105"
          >
             <span className="mr-2">📄</span> QUIZ
          </Button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-white border-2 border-brand-stroke rounded-full text-slate-400 hover:text-brand-purple transition-all"
          >
            <span className="text-xl leading-none block">⚙️</span>
          </button>
          <button 
            onClick={onClose} 
            className="p-3 bg-white border-2 border-brand-stroke rounded-full text-slate-400 hover:text-brand-red transition-all"
          >
            <span className="text-xl leading-none block">✕</span>
          </button>
        </div>
      </header>

      {/* Settings Popover */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-24 right-10 z-50 bg-white border-2 border-brand-stroke shadow-xl rounded-2xl p-6 w-64"
          >
            <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-4">Lesson Settings</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Auto-play Audio</span>
              <button 
                onClick={() => setAutoPlay(!autoPlay)}
                className={`w-12 h-6 rounded-full transition-colors relative ${autoPlay ? 'bg-brand-green' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoPlay ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <button 
              onClick={() => setShowSettings(false)}
              className="mt-6 w-full py-2 bg-brand-snow border-2 border-brand-stroke rounded-xl text-xs font-black uppercase tracking-widest"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Flashcard - Centered like Screenshot */}
      <div className="flex-grow flex items-center justify-center relative perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentIndex}-${isFlipped}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl"
          >
            <Card 
              onClick={() => setIsFlipped(!isFlipped)}
              className="w-full aspect-[1.6/1] flex flex-col items-center justify-center cursor-pointer select-none bg-white border-brand-stroke border-b-[10px] shadow-soft relative p-12 rounded-[40px]"
            >
              <div className="absolute top-8 left-10 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                {isFlipped ? 'TRANSLATION' : 'FLIP'}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }} 
                className={`absolute top-8 right-10 text-3xl transition-colors ${isFavorite ? 'text-brand-yellow' : 'text-slate-200 hover:text-brand-yellow'}`}
              >
                {isFavorite ? '★' : '☆'}
              </button>

              <h3 className={`text-center font-black tracking-tight leading-none transition-all ${isFlipped ? 'text-5xl text-slate-700' : 'text-7xl text-brand-text'}`}>
                {isFlipped ? currentCard.translation : currentCard.term}
              </h3>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Footer - Matching the icons in the user's second screenshot */}
      <footer className="py-12 flex items-center justify-between px-10">
        <button 
          onClick={handleShuffle}
          className="w-12 h-12 flex items-center justify-center bg-brand-blue text-white rounded-xl shadow-3d-blue hover:brightness-110 active:translate-y-1 active:shadow-none transition-all"
        >
          <span className="text-xl">🔀</span>
        </button>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-16 h-16 rounded-full border-2 border-brand-purple text-brand-purple flex items-center justify-center hover:bg-brand-purple/5 disabled:opacity-20 transition-all font-bold text-2xl"
          >
            ←
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            disabled={isAudioLoading}
            className={`w-20 h-20 rounded-full bg-[#1C1C21] text-white flex items-center justify-center shadow-xl transform active:scale-95 transition-all hover:scale-105 ${isPlaying ? 'bg-brand-purple animate-pulse' : ''}`}
          >
            {isAudioLoading ? (
              <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <StopIcon className="w-8 h-8" />
            ) : (
              <SpeakerIcon className="w-8 h-8" />
            )}
          </button>

          <button 
            onClick={handleNext}
            className="w-16 h-16 rounded-full border-2 border-brand-purple text-brand-purple flex items-center justify-center hover:bg-brand-purple/5 transition-all font-bold text-2xl"
          >
            →
          </button>
        </div>

        <button 
          onClick={handleReset}
          className="w-12 h-12 flex items-center justify-center bg-brand-blue text-white rounded-xl shadow-3d-blue hover:brightness-110 active:translate-y-1 active:shadow-none transition-all"
        >
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
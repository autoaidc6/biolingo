import React, { useState, useEffect } from 'react';
import { MatchingPair } from '../../types';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';

interface MatchingLessonProps {
  pairs: MatchingPair[];
  onComplete: () => void;
}

type CardType = {
  id: number;
  pairId: number;
  text: string;
};

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export const MatchingLesson: React.FC<MatchingLessonProps> = ({ pairs, onComplete }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const gameCards = pairs.flatMap(pair => [
      { id: pair.id * 2 -1, pairId: pair.id, text: pair.term },
      { id: pair.id * 2, pairId: pair.id, text: pair.definition },
    ]);
    setCards(shuffleArray(gameCards));
  }, [pairs]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setIsChecking(true);
      const [first, second] = selectedCards;
      if (first.pairId === second.pairId) {
        setMatchedPairIds(prev => [...prev, first.pairId]);
        setSelectedCards([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setSelectedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (pairs.length > 0 && matchedPairIds.length === pairs.length) {
      setTimeout(() => setIsFinished(true), 500);
    }
  }, [matchedPairIds, pairs.length]);


  const handleCardClick = (card: CardType) => {
    if (isChecking || selectedCards.length >= 2 || matchedPairIds.includes(card.pairId) || selectedCards.find(c => c.id === card.id)) {
      return;
    }
    setSelectedCards(prev => [...prev, card]);
  };
  
  if (isFinished) {
    return (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <h2 className="text-3xl font-bold text-brand-text">Lesson Complete!</h2>
                <Card className="mt-4">
                    <p className="text-5xl font-bold text-brand-green my-2">🎉</p>
                    <p className="text-gray-600">You matched all the pairs!</p>
                </Card>
                <div className="mt-8 w-full">
                    <Button onClick={onComplete} fullWidth>Finish</Button>
                </div>
            </motion.div>
        </div>
    );
  }

  const progress = (matchedPairIds.length / pairs.length) * 100;

  return (
    <div className="flex flex-col h-full">
      <div className="w-full bg-brand-stroke rounded-full h-4 mb-4">
        <motion.div 
          className="bg-brand-green h-4 rounded-full" 
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>
      <h2 className="text-2xl font-bold text-brand-text mb-6 text-center">Match the pairs</h2>
      <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-3">
        <AnimatePresence>
          {cards.map(card => {
            const isSelected = selectedCards.some(c => c.id === card.id);
            const isMatched = matchedPairIds.includes(card.pairId);

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  onClick={() => handleCardClick(card)}
                  disabled={isMatched}
                  className={`w-full h-full text-center p-2 rounded-xl border-b-4 transition-all duration-300 flex items-center justify-center font-bold text-base
                    ${isMatched ? 'bg-green-200 border-green-400 text-green-800 cursor-not-allowed' : ''}
                    ${isSelected ? 'bg-blue-200 border-blue-400 -translate-y-1' : 'bg-white border-gray-200'}
                    ${!isMatched && !isSelected ? 'hover:border-brand-blue hover:bg-blue-50 active:scale-95' : ''}
                  `}
                >
                  {card.text}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
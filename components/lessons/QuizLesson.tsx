import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Mascot } from '../ui/Mascot';

interface QuizLessonProps {
  questions: QuizQuestion[];
  onComplete: (correctAnswers: number) => void;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

export const QuizLesson: React.FC<QuizLessonProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [status, setStatus] = useState<AnswerStatus>('unanswered');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleSelectAnswer = (option: string) => {
    if (status === 'unanswered') {
      setSelectedAnswer(option);
    }
  };

  const handleCheck = () => {
    if (!selectedAnswer) return;
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setStatus('correct');
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      setStatus('incorrect');
    }
  };

  const handleContinue = () => {
    setStatus('unanswered');
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  const handleFinish = () => {
    onComplete(correctAnswersCount);
  }

  if (isFinished) {
    return (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-xs">
                <Mascot size={160} expression="celebrate" showBubble="WOW!" />
                <h2 className="text-3xl font-black text-brand-text mt-8 uppercase tracking-tight">Lesson Complete!</h2>
                <Card className="mt-6 border-b-8">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Performance</p>
                    <p className="text-5xl font-black text-brand-green my-2">{Math.round((correctAnswersCount / questions.length) * 100)}%</p>
                    <p className="text-sm font-bold text-gray-500 uppercase">{correctAnswersCount} / {questions.length} Correct</p>
                </Card>
                <div className="mt-10">
                    <Button onClick={handleFinish} fullWidth size="lg">Continue</Button>
                </div>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
        <div className="w-full bg-brand-stroke rounded-full h-4 mb-8 overflow-hidden">
          <motion.div 
            className="bg-brand-green h-full rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>

      <div className="flex-grow flex flex-col">
        <h2 className="text-2xl font-black text-brand-text mb-8 leading-tight">{currentQuestion.question}</h2>
        <div className="space-y-4">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            let buttonClasses = "border-2 border-b-8 font-extrabold w-full text-left p-5 rounded-3xl transition-all text-sm uppercase tracking-wide";
            
            if (status === 'unanswered') {
                buttonClasses += ` bg-white border-brand-stroke hover:bg-brand-snow hover:border-brand-blue ${isSelected ? '!border-brand-blue bg-brand-blue/10 text-brand-blue' : 'text-brand-text'}`;
            } else if (isSelected) {
                buttonClasses += status === 'correct' ? ' bg-brand-green/20 border-brand-green text-brand-green' : ' bg-brand-red/20 border-brand-red text-brand-red';
            } else if (option === currentQuestion.correctAnswer) {
                buttonClasses += ' bg-brand-green/10 border-brand-green/30 text-brand-green';
            } else {
                 buttonClasses += ' bg-white border-brand-stroke opacity-30';
            }

            return (
                <button key={option} onClick={() => handleSelectAnswer(option)} className={buttonClasses} disabled={status !== 'unanswered'}>
                    {option}
                </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8">
        <AnimatePresence>
          {status !== 'unanswered' && (
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`p-6 rounded-t-3xl mb-4 flex items-center gap-4 ${status === 'correct' ? 'bg-brand-green text-white' : 'bg-brand-red text-white'}`}
             >
                <div className="bg-white/20 p-2 rounded-xl">
                   <Mascot size={40} expression={status === 'correct' ? 'happy' : 'thinking'} />
                </div>
                <div>
                   <p className="font-black text-lg uppercase tracking-tight">{status === 'correct' ? 'Nice Job!' : 'Incorrect'}</p>
                   <p className="text-xs font-bold opacity-90">{status === 'correct' ? 'You are doing great!' : `Correct: ${currentQuestion.correctAnswer}`}</p>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
        <Button 
            fullWidth 
            onClick={status === 'unanswered' ? handleCheck : handleContinue}
            disabled={!selectedAnswer && status === 'unanswered'}
            variant={status === 'correct' ? 'primary' : status === 'incorrect' ? 'danger' : 'primary'}
            size="lg"
        >
          {status === 'unanswered' ? 'Check' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
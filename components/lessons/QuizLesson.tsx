import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <h2 className="text-3xl font-bold text-brand-text">Lesson Complete!</h2>
                <Card className="mt-4">
                    <p className="text-lg">You scored:</p>
                    <p className="text-5xl font-bold text-brand-green my-2">{Math.round((correctAnswersCount / questions.length) * 100)}%</p>
                    <p className="text-gray-600">{correctAnswersCount} out of {questions.length} correct</p>
                </Card>
                <div className="mt-8 w-full">
                    <Button onClick={handleFinish} fullWidth>Finish</Button>
                </div>
            </motion.div>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
        {/* Progress Bar */}
        <div className="w-full bg-brand-stroke rounded-full h-4 mb-4">
          <motion.div 
            className="bg-brand-green h-4 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
          />
        </div>

      <div className="flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-brand-text mb-6">{currentQuestion.question}</h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            let buttonClasses = "border-b-4 text-brand-text font-bold w-full text-left p-4 rounded-2xl transition-all";
            
            if (status === 'unanswered') {
                buttonClasses += ` bg-white border-gray-200 hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0 ${isSelected ? '!border-brand-blue bg-blue-100/70' : ''}`;
            } else if (isSelected) {
                buttonClasses += status === 'correct' ? ' bg-green-200 border-green-400 text-green-800' : ' bg-red-200 border-red-400 text-red-800';
            } else if (option === currentQuestion.correctAnswer) {
                buttonClasses += ' bg-green-200 border-green-400 text-green-800';
            } else {
                 buttonClasses += ' bg-white border-gray-200 opacity-50';
            }

            return (
                <button key={option} onClick={() => handleSelectAnswer(option)} className={buttonClasses} disabled={status !== 'unanswered'}>
                    {option}
                </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-auto">
        <AnimatePresence>
          {status !== 'unanswered' && (
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`p-4 rounded-t-xl text-center font-bold text-xl ${status === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
             >
                {status === 'correct' ? 'Correct! 🎉' : `Not quite. Correct answer: ${currentQuestion.correctAnswer}`}
             </motion.div>
          )}
        </AnimatePresence>
        <Button 
            fullWidth 
            onClick={status === 'unanswered' ? handleCheck : handleContinue}
            disabled={!selectedAnswer && status === 'unanswered'}
            variant={status === 'correct' ? 'primary' : status === 'incorrect' ? 'secondary' : 'primary'}
            className={status !== 'unanswered' ? (status === 'correct' ? '' : '!bg-red-500 border-red-700 hover:!bg-red-600') : ''}
        >
          {status === 'unanswered' ? 'Check' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
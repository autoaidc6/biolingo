import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCourses } from '../contexts/CourseContext';
import { LessonType, MatchingPair, QuizQuestion } from '../types';
import { QuizLesson } from '../components/lessons/QuizLesson';
import { ReadingLesson } from '../components/lessons/ReadingLesson';
import { MatchingLesson } from '../components/lessons/MatchingLesson';
import { Mascot } from '../components/ui/Mascot';
import { motion, AnimatePresence } from 'framer-motion';

export const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLessonById, completeLesson } = useCourses();
  const [isCelebration, setIsCelebration] = useState(false);

  const lessonData = getLessonById(id!);
  if (!lessonData) return <div>Lesson not found</div>;
  
  const { course, lesson } = lessonData;

  const handleLessonComplete = () => {
      completeLesson(lesson.id);
      setIsCelebration(true);
      setTimeout(() => navigate(`/course/${course.id}`), 3000);
  }

  if (isCelebration) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 p-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <Mascot size={200} expression="happy" showBubble="¡Excelente!" />
          <h2 className="text-4xl font-extrabold text-brand-green mt-12 mb-2">Lesson Complete!</h2>
          <p className="text-gray-500 font-bold text-xl">You're making great progress.</p>
        </motion.div>
      </div>
    );
  }

  const renderLessonContent = () => {
    switch(lesson.type) {
      case LessonType.QUIZ:
        return <QuizLesson questions={lesson.content as QuizQuestion[] || []} onComplete={() => handleLessonComplete()} />;
      case LessonType.READING:
        return <ReadingLesson content={lesson.content as string[] || []} onComplete={handleLessonComplete} />;
      case LessonType.MATCHING:
        return <MatchingLesson pairs={lesson.content as MatchingPair[] || []} onComplete={handleLessonComplete} />;
      default:
        return (
          <div className="flex-grow flex flex-col justify-center text-center">
            <h1 className="text-3xl font-bold text-brand-text mb-4">Lesson: {lesson.title}</h1>
            <Button fullWidth onClick={handleLessonComplete}>Complete Lesson</Button>
          </div>
        );
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="flex items-center justify-between mb-4">
        <button onClick={() => navigate(`/course/${course.id}`)} className="text-3xl text-gray-400 hover:text-brand-text">&times;</button>
        <Mascot size={45} expression="collapsed" />
      </header>
      {renderLessonContent()}
    </div>
  );
};

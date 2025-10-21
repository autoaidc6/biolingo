import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCourses } from '../contexts/CourseContext';
import { LessonType, MatchingPair, QuizQuestion } from '../types';
import { QuizLesson } from '../components/lessons/QuizLesson';
import { ReadingLesson } from '../components/lessons/ReadingLesson';
import { MatchingLesson } from '../components/lessons/MatchingLesson';

export const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getLessonById, completeLesson } = useCourses();

  const lessonData = getLessonById(id!);

  if (!lessonData) {
    return <div>Lesson not found</div>;
  }
  
  const { course, lesson } = lessonData;

  const handleLessonComplete = () => {
      completeLesson(lesson.id);
      navigate(`/course/${course.id}`);
  }

  const renderLessonContent = () => {
    switch(lesson.type) {
      case LessonType.QUIZ:
        return (
          <QuizLesson 
            questions={lesson.content as QuizQuestion[] || []}
            onComplete={() => handleLessonComplete()}
          />
        );
      case LessonType.READING:
        return (
          <ReadingLesson
            content={lesson.content as string[] || []}
            onComplete={handleLessonComplete}
          />
        );
      case LessonType.MATCHING:
        return (
          <MatchingLesson
            pairs={lesson.content as MatchingPair[] || []}
            onComplete={handleLessonComplete}
          />
        );
      default:
        return (
          <>
            <div className="flex-grow flex flex-col justify-center text-center">
              <h1 className="text-3xl font-bold text-brand-text mb-4">Lesson: {lesson.title}</h1>
              <Card>
                <p className="text-lg text-gray-600">
                  This is a placeholder for a '{lesson.type}' lesson. 
                  Interactive content would be displayed here.
                </p>
              </Card>
            </div>
            <div className="mt-auto">
              <Button fullWidth onClick={handleLessonComplete}>
                Complete Lesson
              </Button>
            </div>
          </>
        );
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <header className="flex items-center justify-between mb-2">
        <button onClick={() => navigate(`/course/${course.id}`)} className="text-2xl text-gray-400 p-2">&times;</button>
      </header>
      
      {renderLessonContent()}
    </div>
  );
};
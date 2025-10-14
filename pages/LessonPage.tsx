
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  let lesson;
  let course;

  for (const c of MOCK_COURSES) {
    const l = c.lessons.find(lesson => lesson.id === id);
    if (l) {
      lesson = l;
      course = c;
      break;
    }
  }

  if (!lesson || !course) {
    return <div>Lesson not found</div>;
  }

  return (
    <div className="flex flex-col h-[85vh]">
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(`/course/${course?.id}`)} className="text-2xl text-gray-400">&times;</button>
        <div className="w-full bg-brand-stroke rounded-full h-4 mx-4">
          <div className="bg-brand-green h-4 rounded-full" style={{ width: '33%' }}></div>
        </div>
      </header>

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
        <Button fullWidth onClick={() => navigate(`/course/${course?.id}`)}>
          Complete Lesson
        </Button>
      </div>
    </div>
  );
};

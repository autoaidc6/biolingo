
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_COURSES } from '../constants';
import { Button } from '../components/ui/Button';

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;


export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find((c) => c.id === id);

  if (!course) {
    return <div>Course not found</div>;
  }
  
  const firstUncompletedIndex = course.lessons.findIndex(l => !l.completed);

  return (
    <div className="space-y-4">
      <button onClick={() => navigate(-1)} className="text-brand-blue font-bold mb-4">← Back to courses</button>
      <div className={`p-6 rounded-xl ${course.color}`}>
        <div className="text-6xl mb-4">{course.icon}</div>
        <h1 className="text-3xl font-bold text-brand-text">{course.title}</h1>
        <p className="text-gray-700 mt-1">{course.description}</p>
      </div>

      <div className="space-y-3">
        {course.lessons.map((lesson, index) => {
          const isLocked = firstUncompletedIndex !== -1 && index > firstUncompletedIndex;
          const isNext = index === firstUncompletedIndex;

          return (
            <Link 
              key={lesson.id} 
              to={isLocked ? '#' : `/lesson/${lesson.id}`} 
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${isLocked ? 'bg-gray-100 border-brand-stroke' : 'bg-white border-brand-stroke hover:border-brand-blue'}`}
              onClick={(e) => isLocked && e.preventDefault()}
            >
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center h-10 w-10 rounded-full ${lesson.completed ? 'bg-brand-green/20' : isLocked ? 'bg-gray-200' : 'bg-brand-blue'}`}>
                  {lesson.completed ? <CheckIcon/> : isLocked ? <LockIcon/> : <PlayIcon />}
                </div>
                <span className={`font-bold ${isLocked ? 'text-gray-400' : 'text-brand-text'}`}>{lesson.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

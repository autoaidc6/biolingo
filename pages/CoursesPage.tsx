import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { useCourses } from '../contexts/CourseContext';

export const CoursesPage: React.FC = () => {
  const { courses } = useCourses();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-text">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <Card className="hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 h-full">
              <div className="flex items-center gap-4">
                <div className={`text-4xl p-4 rounded-xl ${course.color}`}>{course.icon}</div>
                <div>
                  <h2 className="text-lg font-bold text-brand-text">{course.title}</h2>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

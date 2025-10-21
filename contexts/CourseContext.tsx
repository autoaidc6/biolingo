import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Course, Lesson } from '../types';
import { MOCK_COURSES } from '../constants';

interface CourseContextType {
  courses: Course[];
  getCourseById: (id: string) => Course | undefined;
  getLessonById: (id: string) => { course: Course; lesson: Lesson } | undefined;
  completeLesson: (lessonId: string) => void;
  isLoading: boolean;
}

export const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedCourses = localStorage.getItem('biolingo_courses');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      } else {
        // Initialize with mock data if nothing is in storage
        setCourses(MOCK_COURSES);
      }
    } catch (error) {
      console.error("Failed to parse courses from localStorage", error);
      setCourses(MOCK_COURSES);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const updateAndStoreCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
    localStorage.setItem('biolingo_courses', JSON.stringify(newCourses));
  }

  const getCourseById = (id: string): Course | undefined => {
    return courses.find(c => c.id === id);
  };

  const getLessonById = (id: string): { course: Course; lesson: Lesson } | undefined => {
    for (const course of courses) {
      const lesson = course.lessons.find(l => l.id === id);
      if (lesson) {
        return { course, lesson };
      }
    }
    return undefined;
  };
  
  const completeLesson = (lessonId: string) => {
    const newCourses = courses.map(course => ({
        ...course,
        lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
                return { ...lesson, completed: true };
            }
            return lesson;
        })
    }));
    updateAndStoreCourses(newCourses);
  };


  const value = {
    courses,
    getCourseById,
    getLessonById,
    completeLesson,
    isLoading,
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

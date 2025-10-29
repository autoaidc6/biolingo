import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Course, Lesson } from '../types';
import { MOCK_COURSES } from '../constants';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../hooks/useAuth';

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
  const { user } = useAuth();

  useEffect(() => {
    const loadCourseData = async () => {
      setIsLoading(true);
      if (user) {
        try {
          // Fetch completed lesson IDs for the current user
          const { data: progress, error } = await supabase
            .from('user_lesson_progress')
            .select('lesson_id')
            .eq('user_id', user.id);

          if (error) {
            console.error("Error fetching lesson progress:", error.message);
            // Fallback to default courses if progress can't be fetched
            setCourses(MOCK_COURSES);
            return;
          }

          const completedIds = new Set(progress.map(p => p.lesson_id));
          
          // Merge the user's progress with the mock course data
          const userCourses = MOCK_COURSES.map(course => ({
            ...course,
            lessons: course.lessons.map(lesson => ({
              ...lesson,
              completed: completedIds.has(lesson.id),
            })),
          }));
          setCourses(userCourses);

        } catch (err) {
            console.error("An unexpected error occurred while loading courses:", err);
            setCourses(MOCK_COURSES);
        } finally {
            setIsLoading(false);
        }
      } else {
        // No user logged in, show default course state (all incomplete)
        setCourses(MOCK_COURSES);
        setIsLoading(false);
      }
    };
    
    loadCourseData();
  }, [user]); // Re-run this effect when the user logs in or out
  
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
  
  const completeLesson = async (lessonId: string) => {
    if (!user) {
      console.warn("Cannot complete lesson: no user is logged in.");
      return;
    }

    const originalCourses = courses;
    // 1. Update UI immediately for an optimistic response
    const newCourses = courses.map(course => ({
        ...course,
        lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId && !lesson.completed) {
                return { ...lesson, completed: true };
            }
            return lesson;
        })
    }));
    setCourses(newCourses);

    // 2. Persist the completion to Supabase
    try {
      const { error } = await supabase
        .from('user_lesson_progress')
        .insert({ user_id: user.id, lesson_id: lessonId });
      
      if (error) {
        // If the insert fails (e.g., duplicate key), it's not a critical error
        if (error.code !== '23505') {
          throw error;
        }
      }
    } catch (error) {
        console.error("Failed to save lesson progress:", error);
        // Revert UI on failure
        setCourses(originalCourses);
        alert("Could not save your progress. Please check your connection and try again.");
    }
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
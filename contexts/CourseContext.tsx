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

const applyProgressToCourses = (completedIds: Set<string>): Course[] => {
    return MOCK_COURSES.map(course => ({
        ...course,
        lessons: course.lessons.map(lesson => ({
            ...lesson,
            completed: completedIds.has(lesson.id),
        })),
    }));
};

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const syncOfflineProgress = async () => {
    if (!user || !navigator.onLine || !supabase) return;
    
    const queue = JSON.parse(localStorage.getItem(`offline_queue_${user.id}`) || '[]');
    if (queue.length === 0) return;

    console.log(`Syncing ${queue.length} offline lesson completions.`);
    
    const itemsToSync = queue.map((lessonId: string) => ({
      user_id: user.id,
      lesson_id: lessonId,
    }));

    const { error } = await supabase.from('user_lesson_progress').upsert(itemsToSync);

    if (error) {
      console.error("Failed to sync offline progress:", error);
    } else {
      console.log("Offline progress synced successfully.");
      localStorage.removeItem(`offline_queue_${user.id}`);
    }
  };

  useEffect(() => {
    const loadCourseData = async () => {
      setIsLoading(true);
      if (user) {
        // Try to sync any pending changes first when the app loads and is online
        if (navigator.onLine) {
            await syncOfflineProgress();
        }

        try {
          if (!supabase) {
              throw new Error("Supabase not configured");
          }

          // Fetch completed lesson IDs for the current user
          const { data: progress, error } = await supabase
            .from('user_lesson_progress')
            .select('lesson_id')
            .eq('user_id', user.id);

          if (error) {
            throw error; // Let the catch block handle it
          }

          // FIX: Explicitly cast the data to avoid Set<unknown> error.
          const completedIds = new Set((progress as any[] || []).map((p: any) => p.lesson_id as string));
          
          // Save the fresh progress to local storage for offline use
          localStorage.setItem(`progress_${user.id}`, JSON.stringify(Array.from(completedIds)));

          const userCourses = applyProgressToCourses(completedIds);
          setCourses(userCourses);

        } catch (err) {
            // Fallback to local storage (Guest mode or Offline or Supabase missing)
            const cachedProgress = localStorage.getItem(`progress_${user.id}`);
            // FIX: JSON.parse returns `any`, so we must cast the result to `string[]` and explicitly type the empty Set to ensure `completedIds` is `Set<string>`.
            const completedIds = cachedProgress ? new Set(JSON.parse(cachedProgress) as string[]) : new Set<string>();
            const userCourses = applyProgressToCourses(completedIds);
            setCourses(userCourses);
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

    // Add event listener for when the app comes back online
    window.addEventListener('online', syncOfflineProgress);
    return () => {
        window.removeEventListener('online', syncOfflineProgress);
    };

  }, [user]);
  
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
      // For a guest user (unauthenticated), we can optimistically update UI
      const newCourses = courses.map(course => ({
          ...course,
          lessons: course.lessons.map(l => l.id === lessonId ? { ...l, completed: true } : l)
      }));
      setCourses(newCourses);
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

    // Also update our local storage cache immediately
    const cachedProgress = localStorage.getItem(`progress_${user.id}`);
    const completedIds = cachedProgress ? new Set(JSON.parse(cachedProgress) as string[]) : new Set<string>();
    completedIds.add(lessonId);
    localStorage.setItem(`progress_${user.id}`, JSON.stringify(Array.from(completedIds)));

    // 2. Persist the completion to Supabase or queue if offline
    try {
      if (!supabase) {
          throw new Error("Supabase not configured");
      }

      const { error } = await supabase
        .from('user_lesson_progress')
        .insert({ user_id: user.id, lesson_id: lessonId });
      
      if (error && error.code !== '23505') { // Ignore duplicate key errors
          throw error;
      }
    } catch (error) {
        // If offline or no supabase, queue is implicitly handled by local storage update above for session.
        // But for sync logic, we can still use the queue.
        if (!supabase) {
            // Guest mode: Data is already saved to local storage "progress_{user.id}" above.
            // We don't need to do anything else.
        } else if (!navigator.onLine) {
            console.log("App is offline. Queuing lesson completion.");
            const queue = JSON.parse(localStorage.getItem(`offline_queue_${user.id}`) || '[]');
            if (!queue.includes(lessonId)) {
                queue.push(lessonId);
                localStorage.setItem(`offline_queue_${user.id}`, JSON.stringify(queue));
            }
        } else {
            // Revert UI on real failure if online and supabase exists
            console.error("Failed to save lesson progress:", error);
            setCourses(originalCourses);
            alert("Could not save your progress. Please check your connection and try again.");
        }
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
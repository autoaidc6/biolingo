import React, { createContext, useState, useEffect, ReactNode, useContext, useCallback } from 'react';
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

const SYNC_QUEUE_KEY = 'biolingo_sync_queue';

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const getSyncQueue = (): string[] => JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) || '[]');
  const setSyncQueue = (queue: string[]) => localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));

  const syncPendingCompletions = useCallback(async () => {
    let queue = getSyncQueue();
    if (queue.length === 0) return;

    console.log(`Syncing ${queue.length} pending lesson completions...`);
    
    const lessonsToSync = [...queue]; // Create a copy to iterate over
    let successfullySynced: string[] = [];

    for (const lessonId of lessonsToSync) {
        try {
            const response = await fetch('/api/complete-lesson', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lessonId }),
            });
            if (response.ok) {
                successfullySynced.push(lessonId);
            } else {
                console.error(`Failed to sync lesson ${lessonId}, server responded with ${response.status}`);
                // Stop syncing if server has issues
                break;
            }
        } catch (error) {
            console.warn("Sync failed, device is likely offline. Will retry later.", error);
            // Stop syncing if network request fails
            break;
        }
    }

    // Remove successfully synced items from the queue
    if (successfullySynced.length > 0) {
        const newQueue = getSyncQueue().filter(id => !successfullySynced.includes(id));
        setSyncQueue(newQueue);
        console.log(`Successfully synced ${successfullySynced.length} lessons.`);
    }
  }, []);

  useEffect(() => {
    // Listen to online/offline status changes
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
        window.removeEventListener('online', goOnline);
        window.removeEventListener('offline', goOffline);
    };
  }, []);

  useEffect(() => {
    // When app comes online, try to sync pending completions
    if (isOnline) {
        syncPendingCompletions();
    }
  }, [isOnline, syncPendingCompletions]);

  useEffect(() => {
    try {
      const storedCourses = localStorage.getItem('biolingo_courses');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      } else {
        setCourses(MOCK_COURSES);
      }
    } catch (error) {
      console.error("Failed to parse courses from localStorage", error);
      setCourses(MOCK_COURSES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // When courses are loaded, send them to the service worker for caching.
    // This ensures lesson content is available offline.
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller && courses.length > 0) {
        navigator.serviceWorker.controller.postMessage({
            type: 'CACHE_LESSON_DATA',
            payload: courses
        });
    }
  }, [courses]);
  
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
    // 1. Update UI immediately for optimistic response
    const newCourses = courses.map(course => ({
        ...course,
        lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId && !lesson.completed) {
                return { ...lesson, completed: true };
            }
            return lesson;
        })
    }));
    updateAndStoreCourses(newCourses);

    // 2. Add to sync queue
    const queue = getSyncQueue();
    if (!queue.includes(lessonId)) {
        queue.push(lessonId);
        setSyncQueue(queue);
    }

    // 3. Attempt to sync immediately if online
    if (isOnline) {
        syncPendingCompletions();
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
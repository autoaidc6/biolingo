
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  streak: number;
  points: number;
}

export enum LessonType {
  QUIZ = 'quiz',
  READING = 'reading',
  MATCHING = 'matching',
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string; // Emoji or SVG string
  color: string; // Tailwind color class
  lessons: Lesson[];
}

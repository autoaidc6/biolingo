export enum LessonType {
  READING = 'READING',
  QUIZ = 'QUIZ',
  MATCHING = 'MATCHING',
  FLASHCARD = 'FLASHCARD',
}

export enum ProficiencyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string;
  streak: number;
  points: number;
  learningGoal?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface MatchingPair {
  id: number;
  term: string;
  definition: string;
}

export interface Flashcard {
  id: string;
  term: string;
  translation: string;
  pronunciation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  completed: boolean;
  content: string[] | QuizQuestion[] | MatchingPair[] | Flashcard[];
}

export interface Course {
  id:string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  level: ProficiencyLevel;
  duration: string;
  thumbnail: string;
  transcript: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  image: string;
}
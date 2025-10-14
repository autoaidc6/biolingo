import { Course, User, LessonType } from './types';

export const MOCK_USER: User = {
  id: '1',
  email: 'learner@biolingo.com',
  name: 'Alex',
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
  streak: 5,
  points: 1250,
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'spanish-foundations-1',
    title: 'Foundations 1',
    description: 'Start with the basics: greetings, alphabet, and essential phrases.',
    icon: '👋',
    color: 'bg-green-100',
    lessons: [
      { id: 'sf1-1', title: 'Greetings', type: LessonType.READING, completed: true },
      { id: 'sf1-2', title: 'The Alphabet', type: LessonType.QUIZ, completed: false },
      { id: 'sf1-3', title: 'Basic Questions', type: LessonType.READING, completed: false },
    ],
  },
  {
    id: 'travel-essentials',
    title: 'Travel Essentials',
    description: 'Learn key phrases for your next trip to a Spanish-speaking country.',
    icon: '✈️',
    color: 'bg-blue-100',
    lessons: [
      { id: 'te1', title: 'At the Airport', type: LessonType.READING, completed: false },
      { id: 'te2', title: 'Asking for Directions', type: LessonType.MATCHING, completed: false },
      { id: 'te3', title: 'Checking In', type: LessonType.QUIZ, completed: false },
    ],
  },
  {
    id: 'food-and-drink',
    title: 'Food & Drink',
    description: 'Master vocabulary for ordering at restaurants and cafes.',
    icon: '🌮',
    color: 'bg-red-100',
    lessons: [
      { id: 'fd1', title: 'In the Restaurant', type: LessonType.READING, completed: false },
      { id: 'fd2', title: 'Common Dishes', type: LessonType.MATCHING, completed: false },
    ],
  },
  {
    id: 'grammar-pro',
    title: 'Grammar Pro',
    description: 'Dive into verb conjugations and sentence structures.',
    icon: '📚',
    color: 'bg-yellow-100',
    lessons: [
      { id: 'gp1', title: 'Present Tense', type: LessonType.READING, completed: false },
    ],
  },
];

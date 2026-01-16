import { Course, User, LessonType } from './types';

export const MOCK_USER: User = {
  id: '1',
  email: 'learner@biolingo.com',
  name: 'Alex',
  avatarUrl: 'https://picsum.photos/seed/alex/100/100',
  streak: 5,
  points: 1250,
  learningGoal: 'Travel',
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'colours-foundations',
    title: 'Colours',
    description: 'Master the vibrant spectrum of Spanish colors.',
    icon: '🎨',
    color: 'bg-indigo-50',
    lessons: [
      {
        id: 'col-1',
        title: 'Basic Colours',
        type: LessonType.FLASHCARD,
        completed: false,
        content: [
          { id: '1', term: 'Rojo', translation: 'Red' },
          { id: '2', term: 'Azul', translation: 'Blue' },
          { id: '3', term: 'Verde', translation: 'Green' },
          { id: '4', term: 'Amarillo', translation: 'Yellow' },
          { id: '5', term: 'Blanco', translation: 'White' },
          { id: '6', term: 'Negro', translation: 'Black' },
        ]
      }
    ]
  },
  {
    id: 'food-and-drink',
    title: 'Food',
    description: 'Master vocabulary for ordering at restaurants and cafes.',
    icon: '🍔',
    color: 'bg-red-100',
    lessons: [
      { 
        id: 'fd1', 
        title: 'Basic Food', 
        type: LessonType.FLASHCARD, 
        completed: false,
        content: [
            { id: 'f1', term: 'Pan', translation: 'Bread' },
            { id: 'f2', term: 'Agua', translation: 'Water' },
            { id: 'f3', term: 'Leche', translation: 'Milk' },
            { id: 'f4', term: 'Fruta', translation: 'Fruit' },
        ]
      },
    ],
  },
  {
    id: 'common-verbs',
    title: 'Common Verbs',
    description: 'Essential action words for daily life.',
    icon: '🏃',
    color: 'bg-blue-50',
    lessons: [
      { id: 'verb-1', title: 'Action Verbs', type: LessonType.FLASHCARD, completed: false, content: [{ id: 'v1', term: 'Correr', translation: 'To run' }, { id: 'v2', term: 'Comer', translation: 'To eat' }] }
    ]
  },
  {
    id: 'body-parts',
    title: 'Body Parts',
    description: 'Learn how to describe the human body.',
    icon: '🧍',
    color: 'bg-amber-50',
    lessons: [
      { id: 'body-1', title: 'Head & Face', type: LessonType.FLASHCARD, completed: false, content: [{ id: 'b1', term: 'Cabeza', translation: 'Head' }, { id: 'b2', term: 'Ojo', translation: 'Eye' }] }
    ]
  },
  {
    id: 'clothing',
    title: 'Clothing',
    description: 'What are you wearing today?',
    icon: '👕',
    color: 'bg-red-50',
    lessons: [
      { id: 'cloth-1', title: 'Daily Wear', type: LessonType.FLASHCARD, completed: false, content: [{ id: 'c1', term: 'Camisa', translation: 'Shirt' }, { id: 'c2', term: 'Zapatos', translation: 'Shoes' }] }
    ]
  },
  {
    id: 'places-town',
    title: 'Places around town',
    description: 'Navigate your city with ease.',
    icon: '🏙️',
    color: 'bg-teal-50',
    lessons: [
      { id: 'town-1', title: 'Buildings', type: LessonType.FLASHCARD, completed: false, content: [{ id: 't1', term: 'Banco', translation: 'Bank' }, { id: 't2', term: 'Escuela', translation: 'School' }] }
    ]
  },
  {
    id: 'emotions',
    title: 'Emotions',
    description: 'Express how you feel.',
    icon: '😄',
    color: 'bg-rose-50',
    lessons: [
      { id: 'emot-1', title: 'Feelings', type: LessonType.FLASHCARD, completed: false, content: [{ id: 'e1', term: 'Feliz', translation: 'Happy' }, { id: 'e2', term: 'Triste', translation: 'Sad' }] }
    ]
  },
  {
    id: 'household-items',
    title: 'Household Items',
    description: 'Vocabulary for everything in your home.',
    icon: '🏠',
    color: 'bg-stone-50',
    lessons: [
      { id: 'house-1', title: 'Living Room', type: LessonType.FLASHCARD, completed: false, content: [{ id: 'h1', term: 'Sofá', translation: 'Sofa' }, { id: 'h2', term: 'Mesa', translation: 'Table' }] }
    ]
  },
  {
    id: 'weather-seasons',
    title: 'Weather and Seasons',
    description: 'Talking about the climate.',
    icon: '🌦️',
    color: 'bg-sky-50',
    lessons: [
      { id: 'weather-1', title: 'The Sky', type: LessonType.FLASHCARD, completed: false, content: [{ id: 'w1', term: 'Sol', translation: 'Sun' }, { id: 'w2', term: 'Lluvia', translation: 'Rain' }] }
    ]
  },
  {
    id: 'occupations',
    title: 'Occupations',
    description: 'Jobs and careers in Spanish.',
    icon: '👨‍⚕️',
    color: 'bg-emerald-50',
    lessons: [
      { id: 'job-1', title: 'Medical', type: LessonType.FLASHCARD, completed: false, content: [{ id: 'j1', term: 'Doctor', translation: 'Doctor' }, { id: 'j2', term: 'Enfermera', translation: 'Nurse' }] }
    ]
  },
];
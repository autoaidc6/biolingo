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
          { id: '7', term: 'Naranja', translation: 'Orange' },
          { id: '8', term: 'Rosa', translation: 'Pink' },
        ]
      }
    ]
  },
  {
    id: 'spanish-foundations-1',
    title: 'Foundations 1',
    description: 'Start with the basics: greetings, alphabet, and essential phrases.',
    icon: '👋',
    color: 'bg-green-100',
    lessons: [
      { 
        id: 'sf1-1', 
        title: 'Greetings', 
        type: LessonType.READING, 
        completed: true,
        content: [
          "Let's learn some essential Spanish greetings!",
          "¡Hola! - Hello!",
          "Buenos días - Good morning",
          "Buenas tardes - Good afternoon",
          "Buenas noches - Good evening / Good night",
          "¿Cómo estás? - How are you? (informal)",
          "¿Cómo está usted? - How are you? (formal)",
        ]
      },
      { 
        id: 'sf1-2', 
        title: 'The Alphabet', 
        type: LessonType.QUIZ, 
        completed: false,
        content: [
          { question: "Which letter is pronounced 'ah' in Spanish?", options: ["A", "E", "I", "O"], correctAnswer: "A" },
          { question: "What is the name of the letter 'J' in Spanish?", options: ["Ge", "Jota", "I griega", "Hache"], correctAnswer: "Jota" },
          { question: "Which of these is NOT a vowel in Spanish?", options: ["A", "U", "B", "E"], correctAnswer: "B" },
        ]
      },
    ],
  },
  {
    id: 'food-and-drink',
    title: 'Food & Drink',
    description: 'Master vocabulary for ordering at restaurants and cafes.',
    icon: '🌮',
    color: 'bg-red-100',
    lessons: [
      { 
        id: 'fd1', 
        title: 'In the Restaurant', 
        type: LessonType.READING, 
        completed: false,
        content: [
            "Time to eat! Here's some vocabulary for the restaurant.",
            "La mesa - The table",
            "El menú - The menu",
            "El camarero / La camarera - The waiter / The waitress",
            "La cuenta - The check/bill",
        ]
      },
    ],
  },
];
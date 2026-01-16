import { Course, User, LessonType, Video, ProficiencyLevel } from './types';

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

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'vid-1',
    title: 'Spanish Conversation for Beginners',
    youtubeId: 'p0m_lS_7yA8',
    level: ProficiencyLevel.BEGINNER,
    duration: '2:40',
    thumbnail: 'https://i.ytimg.com/vi/p0m_lS_7yA8/hqdefault.jpg',
    transcript: 'Hola, ¿cómo estás? (Hello, how are you?)\nMuy bien, ¿y tú? (Very well, and you?)\nYo también, gracias. ¿Cómo te llamas? (Me too, thanks. What is your name?)\nMi nombre es Juan. ¿De dónde eres? (My name is Juan. Where are you from?)\nSoy de México. ¡Mucho gusto! (I am from Mexico. Nice to meet you!)'
  },
  {
    id: 'vid-2',
    title: 'The Spanish Alphabet Song',
    youtubeId: '56OXP92SryE',
    level: ProficiencyLevel.INTERMEDIATE,
    duration: '4:30',
    thumbnail: 'https://i.ytimg.com/vi/56OXP92SryE/hqdefault.jpg',
    transcript: 'A, B, C, CH, D, E, F, G... (A, B, C, CH, D, E, F, G...)\nCanta conmigo el abecedario. (Sing the alphabet with me.)\nCada letra tiene su sonido especial. (Each letter has its special sound.)\n¡Aprender español es muy divertido! (Learning Spanish is very fun!)'
  },
  {
    id: 'vid-3',
    title: '3 Questions You Must Know',
    youtubeId: 'j80t0kQ4E_0',
    level: ProficiencyLevel.BEGINNER,
    duration: '3:53',
    thumbnail: 'https://i.ytimg.com/vi/j80t0kQ4E_0/hqdefault.jpg',
    transcript: '¿Qué hora es? (What time is it?)\n¿Dónde está el baño? (Where is the bathroom?)\n¿Cuánto cuesta esto? (How much does this cost?)\nEstas son frases esenciales para viajar. (These are essential phrases for traveling.)'
  },
  {
    id: 'vid-4',
    title: 'Learn the 5 Pillars of Grammar',
    youtubeId: '7B6fB_P_7o0',
    level: ProficiencyLevel.BEGINNER,
    duration: '2:50',
    thumbnail: 'https://i.ytimg.com/vi/7B6fB_P_7o0/hqdefault.jpg',
    transcript: 'Hoy vamos a aprender los pilares de la gramática española. (Today we are going to learn the pillars of Spanish grammar.)\nSustantivos, verbos, adjetivos, adverbios y preposiciones. (Nouns, verbs, adjectives, adverbs and prepositions.)\nEntender esto te ayudará a construir frases. (Understanding this will help you build sentences.)'
  },
  {
    id: 'vid-5',
    title: 'Fruit Names in Spanish',
    youtubeId: 'qf_fL0yE5zM',
    level: ProficiencyLevel.BEGINNER,
    duration: '28:07',
    thumbnail: 'https://i.ytimg.com/vi/qf_fL0yE5zM/hqdefault.jpg',
    transcript: 'Manzana, plátano, naranja, uva. (Apple, banana, orange, grape.)\nVamos al mercado a comprar fruta fresca. (Let\'s go to the market to buy fresh fruit.)\n¿Cuál es tu fruta favorita? (What is your favorite fruit?)'
  },
  {
    id: 'vid-6',
    title: 'Facial Expressions Vocabulary',
    youtubeId: 'S_h6rW3-N6c',
    level: ProficiencyLevel.BEGINNER,
    duration: '11:00',
    thumbnail: 'https://i.ytimg.com/vi/S_h6rW3-N6c/hqdefault.jpg',
    transcript: 'Sonrisa, ceño fruncido, sorpresa. (Smile, frown, surprise.)\n¿Cómo te sientes hoy? Estoy feliz. (How do you feel today? I am happy.)\nLas expresiones faciales son universales. (Facial expressions are universal.)'
  }
];
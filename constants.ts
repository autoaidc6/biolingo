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
      { 
        id: 'sf1-3', 
        title: 'Basic Questions', 
        type: LessonType.READING, 
        completed: false,
        content: [
          "Knowing how to ask questions is key to conversation.",
          "¿Qué? - What?",
          "¿Quién? - Who?",
          "¿Cuándo? - When?",
          "¿Dónde? - Where?",
          "¿Por qué? - Why?",
          "¿Cómo? - How?",
        ]
      },
    ],
  },
  {
    id: 'travel-essentials',
    title: 'Travel Essentials',
    description: 'Learn key phrases for your next trip to a Spanish-speaking country.',
    icon: '✈️',
    color: 'bg-blue-100',
    lessons: [
      { 
        id: 'te1', 
        title: 'At the Airport', 
        type: LessonType.READING, 
        completed: false,
        content: [
            "Navigating the airport is your first challenge!",
            "El aeropuerto - The airport",
            "El vuelo - The flight",
            "El pasaporte - The passport",
            "La maleta - The suitcase",
            "¿Dónde está la puerta de embarque? - Where is the boarding gate?",
        ]
      },
      { 
        id: 'te2', 
        title: 'Asking for Directions', 
        type: LessonType.MATCHING, 
        completed: false,
        content: [
            { id: 1, term: "La calle", definition: "The street" },
            { id: 2, term: "A la derecha", definition: "To the right" },
            { id: 3, term: "A la izquierda", definition: "To the left" },
            { id: 4, term: "Todo recto", definition: "Straight ahead" },
            { id: 5, term: "El mapa", definition: "The map" },
        ]
      },
      { 
        id: 'te3', 
        title: 'Checking In', 
        type: LessonType.QUIZ, 
        completed: false,
        content: [
            { question: "How do you say 'I have a reservation'?", options: ["Tengo una pregunta", "Tengo una reservación", "Quiero un café", "Dónde está el baño"], correctAnswer: "Tengo una reservación" },
            { question: "What does 'La cuenta, por favor' mean?", options: ["The key, please", "The menu, please", "The check, please", "The room, please"], correctAnswer: "The check, please" },
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
      { 
        id: 'fd2', 
        title: 'Common Dishes', 
        type: LessonType.MATCHING, 
        completed: false,
        content: [
            { id: 1, term: "El pollo", definition: "Chicken" },
            { id: 2, term: "El pescado", definition: "Fish" },
            { id: 3, term: "La ensalada", definition: "Salad" },
            { id: 4, term: "La sopa", definition: "Soup" },
            { id: 5, term: "El pan", definition: "Bread" },
        ]
      },
      {
        id: 'fd3',
        title: 'Ordering Food',
        type: LessonType.QUIZ,
        completed: false,
        content: [
          { question: "How would you ask for water?", options: ["Un agua, por favor", "Un vino, por favor", "Un café, por favor", "Una cerveza, por favor"], correctAnswer: "Un agua, por favor" },
          { question: "What does 'postre' mean?", options: ["Appetizer", "Main Course", "Dessert", "Drink"], correctAnswer: "Dessert" },
        ]
      }
    ],
  },
  {
    id: 'grammar-pro',
    title: 'Grammar Pro',
    description: 'Dive into verb conjugations and sentence structures.',
    icon: '📚',
    color: 'bg-yellow-100',
    lessons: [
      { 
        id: 'gp1', 
        title: 'Present Tense', 
        type: LessonType.READING, 
        completed: false,
        content: [
            "The present tense is used for actions happening now or habitual actions.",
            "For verbs ending in -ar (like hablar - to speak): yo hablo, tú hablas, él/ella/usted habla.",
            "For verbs ending in -er (like comer - to eat): yo como, tú comes, él/ella/usted come.",
            "For verbs ending in -ir (like vivir - to live): yo vivo, tú vives, él/ella/usted vive.",
        ]
      },
      { 
        id: 'gp2', 
        title: 'Ser vs. Estar', 
        type: LessonType.READING, 
        completed: false,
        content: [
            "Both 'ser' and 'estar' mean 'to be', but they are used in different contexts.",
            "'Ser' is used for permanent or lasting attributes (DOCTOR): Description, Occupation, Characteristic, Time, Origin, and Relationship.",
            "Example: 'Yo soy alto' (I am tall).",
            "'Estar' is used for temporary states and locations (PLACE): Position, Location, Action, Condition, and Emotion.",
            "Example: 'Yo estoy cansado' (I am tired).",
        ]
      },
      {
        id: 'gp3',
        title: 'Past Tense Quiz',
        type: LessonType.QUIZ,
        completed: false,
        content: [
          { question: "Which is the correct past tense of 'comer' (yo)?", options: ["Como", "Comí", "Comeré", "Comiendo"], correctAnswer: "Comí" },
          { question: "'Fui' is the past tense of which verb?", options: ["Ir (to go)", "Hacer (to do)", "Tener (to have)", "Ver (to see)"], correctAnswer: "Ir (to go)" },
        ]
      },
    ],
  },
  {
    id: 'daily-conversations',
    title: 'Daily Conversations',
    description: 'Practice common interactions and phrases for everyday life.',
    icon: '💬',
    color: 'bg-purple-100',
    lessons: [
      { 
        id: 'dc1', 
        title: 'Making Friends', 
        type: LessonType.READING, 
        completed: false,
        content: [
            "Let's make some friends!",
            "Me llamo... - My name is...",
            "¿Cómo te llamas? - What is your name?",
            "Mucho gusto - Nice to meet you",
            "¿De dónde eres? - Where are you from?",
        ]
      },
      { 
        id: 'dc2', 
        title: 'At the Market', 
        type: LessonType.MATCHING, 
        completed: false,
        content: [
            { id: 1, term: "Las frutas", definition: "The fruits" },
            { id: 2, term: "Las verduras", definition: "The vegetables" },
            { id: 3, term: "¿Cuánto cuesta?", definition: "How much is it?" },
            { id: 4, term: "Un kilo", definition: "One kilo" },
            { id: 5, term: "La bolsa", definition: "The bag" },
        ]
      },
      {
        id: 'dc3',
        title: 'Common Phrases',
        type: LessonType.QUIZ,
        completed: false,
        content: [
          { question: "How do you say 'What's up?' informally?", options: ["¿Cómo estás?", "¿Qué tal?", "¿Qué pasa?", "Buenos días"], correctAnswer: "¿Qué tal?" },
          { question: "What is a common way to say 'See you later'?", options: ["Adiós", "Hasta luego", "Buenas noches", "Gracias"], correctAnswer: "Hasta luego" },
        ]
      }
    ],
  },
  {
    id: 'cultural-insights',
    title: 'Cultural Insights',
    description: 'Learn about the traditions and festivals of Spanish-speaking countries.',
    icon: '🌍',
    color: 'bg-teal-100',
    lessons: [
      { 
        id: 'ci1', 
        title: 'Famous Festivals', 
        type: LessonType.READING, 
        completed: false,
        content: [
            "Spain and Latin America are famous for their vibrant festivals.",
            "La Tomatina: A festival held in Buñol, Spain, where participants throw tomatoes at each other for fun.",
            "Día de los Muertos: The 'Day of the Dead' is a Mexican holiday where families welcome back the souls of their deceased relatives for a brief reunion that includes food, drink, and celebration.",
        ]
      },
      { 
        id: 'ci2', 
        title: 'Traditional Foods', 
        type: LessonType.READING, 
        completed: false,
        content: [
            "Let's explore some delicious traditional foods!",
            "Paella: A famous Spanish rice dish originally from Valencia. It can be made with seafood, chicken, or vegetables.",
            "Tacos: A traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling.",
            "Arepas: A type of food made of ground maize dough, popular in Colombia and Venezuela. It can be served with various fillings like cheese, avocado, or shredded beef.",
        ]
      },
    ],
  },
];
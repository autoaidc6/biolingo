# Biolingo Application Architecture

## 1. Overview

Biolingo is a client-side, single-page application (SPA) built as a Progressive Web App (PWA). It leverages a modern frontend stack with React and TypeScript, and relies heavily on the Google Gemini API for its intelligent features. The architecture is designed to be mobile-first and utilizes Supabase for its backend, including authentication and database.

## 2. Technology Stack

-   **UI Framework:** [React 19](https://react.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Backend as a Service (BaaS):** [Supabase](https://supabase.io/) for Authentication and PostgreSQL Database.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [React Router](https://reactrouter.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **AI Integration:** [@google/genai](https://www.npmjs.com/package/@google/genai) for the Gemini API.
-   **Dependencies:** Served via CDN ([esm.sh](https://esm.sh/)), no local `node_modules` or bundler (e.g., Webpack, Vite) is used.

## 3. Directory Structure

```
/
├── components/         # Reusable UI components
├── contexts/           # React Context providers for global state
├── docs/               # Project documentation
├── hooks/              # Custom React hooks
├── lib/                # Libraries and clients (e.g., Supabase client)
├── pages/              # Top-level route components
├── router/             # App routing configuration
├── utils/              # Utility functions
├── App.tsx             # Root React component
├── index.html          # Main HTML entry point
├── service-worker.js   # Service Worker for PWA features
└── ...
```

## 4. Backend & State Management

### 4.1. Supabase Backend

-   **Authentication:** User sign-up and login are handled by Supabase Auth. Session management and user identity are managed securely.
-   **Database:** A PostgreSQL database provided by Supabase stores user-specific data.
    -   `profiles` table: Stores public user data like name, avatar URL, points, streak, and learning goals. Linked to `auth.users` via a foreign key.
    -   `user_lesson_progress` table: A join table that tracks which lessons each user has completed.

### 4.2. Frontend State Management

Global state is managed using React's Context API.

-   **`AuthContext`**:
    -   Manages the current user's authentication state by subscribing to Supabase's `onAuthStateChange`.
    -   Fetches and provides the user's profile data from the `profiles` table.
    -   Exposes `login`, `signUp`, and `logout` functions that call the Supabase Auth API.
-   **`CourseContext`**:
    -   Holds the static structure of all courses and lessons.
    -   On load, it fetches the logged-in user's progress from the `user_lesson_progress` table and merges it with the static course data to display the correct completion status.
    -   Provides a `completeLesson` function that optimistically updates the UI and persists the change to the Supabase database.

## 5. Offline Support & PWA

The application is a functional PWA, with the service worker focused on reliability and speed.

-   **Service Worker (`service-worker.js`)**:
    -   **App Shell Caching:** On installation, it caches core application assets (`index.html`, JS, icons). This allows the app to load instantly on subsequent visits.
    -   **Fetch Interception:** The service worker uses a cache-first strategy for static assets, ensuring the app interface can be loaded offline.
-   **Data:** Since data is now fetched from a live database, core functionality like completing new lessons requires an internet connection. Previously cached lesson content might still be viewable if the browser cached the API responses, but progress cannot be saved offline.

## 6. Gemini API Integration

The application integrates with the Google Gemini API for AI-powered features.

-   **Chat Tutor (`ChatPage.tsx`)**: Uses `ai.chats.create` for a conversational session.
-   **Image Translation (`ScanPage.tsx`)**: Uses `ai.models.generateContent` with a multi-part request (image + text) and a `responseSchema`.
-   **Lesson Recommendation (`RecommendedLesson.tsx`)**: Uses `ai.models.generateContent` with a `responseSchema` to get personalized suggestions.
-   **Text-to-Speech (`useTextToSpeech.ts`)**: Uses the `gemini-2.5-flash-preview-tts` model to generate audio.

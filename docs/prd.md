# Product Requirements Document: Biolingo

## 1. Introduction

**Vision:** To create a fun, accessible, and effective mobile-first language learning experience. Biolingo aims to make learning a new language (starting with Spanish) feel like a game, incorporating modern AI-powered features to enhance engagement and provide real-world practice.

**Problem:** Traditional language learning can be tedious, expensive, and lacks opportunities for practical, low-pressure conversation practice. Many learners struggle with motivation and applying their knowledge to real-world scenarios.

**Solution:** Biolingo is a Progressive Web App (PWA) inspired by Duolingo that offers a gamified curriculum, interactive lessons, and innovative AI tools like a chatbot tutor and a real-time visual translator. It's designed to be used on-the-go, with full offline capabilities.

## 2. Target Audience

-   **Casual Learners:** Individuals looking to pick up a new language for fun, travel, or brain training.
-   **Beginners:** Users with little to no prior experience in the target language.
-   **Tech-savvy Mobile Users:** People comfortable with using mobile apps for learning and entertainment.

## 3. Key Features

### 3.1. Core Learning Experience
-   **Gamified Progression:** Users earn points and maintain a daily streak to stay motivated.
-   **Structured Courses:** Learning path is divided into thematic courses (e.g., "Foundations", "Travel Essentials").
-   **Locked Progression:** Users must complete lessons in order, ensuring a solid foundation before moving to advanced topics.
-   **Diverse Lesson Types:**
    -   **Reading:** Introduces new vocabulary and grammar concepts.
    -   **Quiz:** Multiple-choice questions to test comprehension.
    -   **Matching:** A memory game to reinforce vocabulary pairs.

### 3.2. User Management
-   **Onboarding:** A simple welcome flow with options to sign up, log in, or continue as a guest.
-   **User Profile:** Displays user information, stats (streak, points), and achievements.
-   **Learning Goals:** Users can set a personal learning goal (e.g., Travel, Career), which influences personalized content recommendations.

### 3.3. AI-Powered Features (Gemini API)
-   **Ustaza AI Chat:** An AI-powered chatbot tutor that allows users to practice Spanish conversation. The AI is designed to be a friendly and patient tutor, correcting mistakes and keeping the conversation engaging.
-   **Scan & Translate:** A feature that uses the device's camera to capture an image, extract text, identify its language, and provide a translation (between English and Spanish).
-   **Personalized Recommendations:** An AI-driven system that analyzes a user's progress and learning goals to recommend the next best lesson or course.
-   **Text-to-Speech:** AI-generated audio for reading lessons and translations, allowing users to hear correct pronunciation.

### 3.4. Technical Features
-   **Mobile-First Responsive Design:** The UI is optimized for a seamless experience on mobile devices.
-   **Progressive Web App (PWA):** The app is installable on a user's home screen, providing an app-like experience from the web.
-   **Offline Functionality:** Users can continue learning even without an internet connection. Lesson progress is saved locally and synced with the server when the connection is restored.

## 4. User Flow

1.  **Onboarding:** User opens the app, sees a splash screen, and is presented with options to "Get Started", "Log In", or "Continue as Guest".
2.  **Dashboard:** After logging in, the user lands on the dashboard which shows their stats, a personalized lesson recommendation, and access to their courses.
3.  **Learning:** User selects a course, navigates through the lessons, and completes them one by one.
4.  **Practice:** User can chat with "Ustaza AI" for conversational practice or use the "Scan" feature to translate real-world text.
5.  **Profile:** User can view their profile to track their statistics, update their learning goal, and see earned achievements.

## 5. Future Enhancements
-   Leaderboards to foster friendly competition.
-   Social features to add friends and track their progress.
-   Support for more languages.
-   Advanced grammar and speaking exercises.

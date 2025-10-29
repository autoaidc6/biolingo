# Biolingo

Biolingo is a mobile-first Progressive Web App (PWA) for learning languages in a fun, gamified way, inspired by Duolingo. It includes structured courses, interactive lessons, and AI-powered features to make learning engaging and practical.

## ✨ Features

-   **Real User Accounts:** Sign up and log in to have your progress saved securely.
-   **Gamified Learning Path:** Progress through courses and lessons, earning points and maintaining a daily streak.
-   **Interactive Lesson Types:** Engage with content through reading, multiple-choice quizzes, and vocabulary matching games.
-   **AI Chat Tutor:** Practice your conversation skills with "Ustaza AI", a friendly and patient chatbot powered by the Gemini API.
-   **AI Scan & Translate:** Use your camera to instantly translate text from the real world between English and Spanish.
-   **AI-Powered Recommendations:** Get personalized suggestions for your next lesson based on your learning goals and progress.
-   **AI Text-to-Speech:** Listen to correct pronunciation for vocabulary and reading materials.
-   **PWA Ready:** Install Biolingo on your phone's home screen for a native app-like experience.

## 🚀 Tech Stack

-   **Framework:** React 19 & TypeScript
-   **Backend:** Supabase (Auth & PostgreSQL Database)
-   **Styling:** Tailwind CSS
-   **Routing:** React Router
-   **AI:** Google Gemini API (`@google/genai`)
-   **State Management:** React Context API
-   **Animations:** Framer Motion
-   **Offline:** Service Workers for App Shell caching.

## 🔧 Getting Started

This project runs directly in the browser without a build step, but requires configuration for Supabase and Gemini API keys.

### Prerequisites

You need a web server to serve the files. If you have Node.js installed, you can use `serve`:

```bash
npm install -g serve
```

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up your Environment Variables:**
    The application requires API keys to function correctly. You need to provide these through a mechanism that sets `process.env` variables. In many development environments, you can create a `.env` file in the root of the project and use a server that supports it (like `vite` or `react-scripts`).

    **For a simple `serve` setup, you may need to manually replace the `process.env` placeholders in the code or use a more advanced local server.**

    Your environment variables should include:
    ```
    # Your Google Gemini API Key
    API_KEY=YOUR_GEMINI_API_KEY

    # Your Supabase Project URL
    SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL

    # Your Supabase Project Anon Key
    SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

3.  **Set up Supabase Database:**
    You need to create the necessary tables and policies in your Supabase project.
    1.  In your Supabase project dashboard, navigate to the **SQL Editor**.
    2.  Click on **"+ New query"**.
    3.  Copy the entire contents of the `docs/sql-script.md` file.
    4.  Paste the script into the query editor and click **"RUN"**.

    This will create the `profiles` and `user_lesson_progress` tables and set up the required security policies.

4.  **Serve the application:**
    From the root directory of the project, run:
    ```bash
    serve
    ```
    Then open your browser to the URL provided by the server (e.g., `http://localhost:3000`).
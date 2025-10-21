
import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';
import { AppRouter } from './router/AppRouter';
import { SplashScreen } from './components/SplashScreen';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Splash screen duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <CourseProvider>
        {showSplash && <SplashScreen />}
        <div className={showSplash ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
          <AppRouter />
        </div>
      </CourseProvider>
    </AuthProvider>
  );
};

export default App;

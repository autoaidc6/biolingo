import React from 'react';

const LogoIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" fill="#58CC02"/>
        <path d="M12 7c-2 0-3 1-3.5 2.5C8 11 9 12 11 12h2c2 0 3-1 3-2.5S14 7 12 7z" fill="white"/>
        <path d="M12 17c2 0 3-1 3.5-2.5C16 13 15 12 13 12h-2c-2 0-3 1-3 2.5S10 17 12 17z" fill="white"/>
    </svg>
);

export const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-brand-green flex flex-col items-center justify-center z-50 animate-fadeOut">
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }
        .animate-fadeOut {
          animation: fadeOut 2.5s forwards;
        }
      `}</style>
      <div className="flex flex-col items-center gap-4">
        <LogoIcon />
        <h1 className="text-4xl font-extrabold text-white">Biolingo</h1>
      </div>
    </div>
  );
};

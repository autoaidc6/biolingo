
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-xl border-2 border-brand-stroke p-4 ${className || ''}`}>
      {children}
    </div>
  );
};

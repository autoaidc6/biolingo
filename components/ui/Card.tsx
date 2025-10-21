import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 ${className || ''}`}>
      {children}
    </div>
  );
};
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outline';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-white border-2 border-brand-stroke',
    elevated: 'bg-white shadow-[0_8px_0_0_rgba(0,0,0,0.03)] border-2 border-brand-stroke',
    outline: 'bg-transparent border-2 border-brand-stroke border-dashed'
  };

  return (
    <div className={`rounded-3xl p-6 transition-all duration-200 ${variantStyles[variant]} ${className || ''}`}>
      {children}
    </div>
  );
};
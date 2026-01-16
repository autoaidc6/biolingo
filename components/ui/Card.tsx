
import React from 'react';

// Fixed: Extended CardProps with React.HTMLAttributes<HTMLDivElement> to support onClick and other div properties
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'default', ...props }) => {
  const variantStyles = {
    default: 'bg-white border-2 border-brand-stroke',
    elevated: 'bg-white shadow-[0_8px_0_0_rgba(0,0,0,0.03)] border-2 border-brand-stroke',
    outline: 'bg-transparent border-2 border-brand-stroke border-dashed'
  };

  return (
    // Fixed: Applied spread operator to div to support event handlers like onClick
    <div 
      className={`rounded-3xl p-6 transition-all duration-200 ${variantStyles[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

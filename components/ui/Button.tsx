
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseClasses = 'font-bold rounded-xl transition-transform duration-200 ease-in-out active:scale-95 flex items-center justify-center';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-green text-white border-b-4 border-brand-green-dark hover:bg-green-500',
  secondary: 'bg-brand-blue text-white border-b-4 border-brand-blue-dark hover:bg-blue-500',
  ghost: 'bg-transparent text-brand-text hover:bg-gray-200',
  outline: 'bg-transparent text-brand-green border-2 border-brand-stroke hover:bg-gray-100'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg uppercase tracking-wider',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  ...props
}) => {
  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className || ''}`;

  return (
    <button className={classes.trim()} {...props}>
      {children}
    </button>
  );
};

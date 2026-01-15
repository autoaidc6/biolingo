import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseClasses = 'font-bold rounded-2xl transition-all duration-100 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform active:translate-y-1 active:border-b-0';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-green text-white border-b-4 border-brand-green-dark hover:brightness-105 active:brightness-95',
  secondary: 'bg-brand-blue text-white border-b-4 border-brand-blue-dark hover:brightness-105 active:brightness-95',
  danger: 'bg-brand-red text-white border-b-4 border-[#D13B3B] hover:brightness-105 active:brightness-95',
  ghost: 'bg-transparent text-brand-text hover:bg-gray-100 border-b-0 active:translate-y-0',
  outline: 'bg-transparent text-brand-blue border-2 border-brand-stroke hover:bg-brand-snow border-b-4 active:translate-y-0.5'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-xs uppercase tracking-wider',
  md: 'py-3 px-6 text-sm uppercase tracking-wide',
  lg: 'py-4 px-8 text-base uppercase tracking-widest',
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
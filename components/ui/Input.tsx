
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="text-sm font-bold text-gray-500 mb-2 block">{label}</label>}
      <input
        id={id}
        className="w-full bg-gray-100 border-2 border-brand-stroke rounded-xl p-4 text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        {...props}
      />
    </div>
  );
};

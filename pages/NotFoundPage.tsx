
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-6xl font-bold text-brand-blue">404</h1>
      <p className="text-xl text-brand-text mt-4">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">The page you're looking for doesn't seem to exist.</p>
      <Link to="/dashboard" className="mt-8">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
};

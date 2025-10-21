import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-off-white">
      <main className="pb-24 pt-4 px-4 max-w-2xl mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Mascot } from '../ui/Mascot';

const sidebarItems = [
  { path: '/dashboard', label: 'Home', icon: '🏠' },
  { path: '/learn', label: 'Learn', icon: '📖' },
  { path: '/videos', label: 'Videos', icon: '▶️' },
  { path: '/chat', label: 'Chat', icon: '💬' },
  { path: '/debate', label: 'Debate', icon: '📣' },
  { path: '/collection', label: 'My Collection', icon: '🔖' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-brand-snow flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-brand-stroke fixed h-full z-50">
        <div className="p-8">
           <div className="flex items-center gap-2 mb-10">
              <Mascot size={32} expression="collapsed" />
              <span className="text-xl font-black text-brand-purple tracking-tighter">Biolingo</span>
           </div>
           
           <nav className="space-y-2">
             {sidebarItems.map((item) => (
               <NavLink
                 key={item.path}
                 to={item.path}
                 className={({ isActive }) =>
                   `flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                     isActive 
                       ? 'bg-brand-purple/5 text-brand-purple shadow-sm' 
                       : 'text-gray-500 hover:bg-brand-snow hover:text-brand-text'
                   }`
                 }
               >
                 <span className="text-xl">{item.icon}</span>
                 <span className="text-sm">{item.label}</span>
               </NavLink>
             ))}
           </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-64 pb-24 md:pb-8 pt-6 px-4 md:px-10 lg:px-16 w-full max-w-7xl">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

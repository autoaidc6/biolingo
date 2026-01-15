import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: '🏠' },
  { path: '/learn', label: 'Learn', icon: '📖' },
  { path: '/chat', label: 'Chat', icon: '💬' },
  { path: '/scan', label: 'Scan', icon: '📸' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

const NavItem: React.FC<{ path: string; label: string; icon: string }> = ({ path, label, icon }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center w-full pt-3 pb-2 transition-colors duration-200 border-t-2 ${
        isActive ? 'text-brand-purple border-brand-purple' : 'text-gray-400 border-transparent hover:text-brand-purple'
      }`
    }
  >
    <span className="text-2xl">{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{label}</span>
  </NavLink>
);

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-brand-stroke z-50 flex shadow-lg px-2">
      {navItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  );
};

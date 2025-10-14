
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'Learn', icon: (active: boolean) => <HomeIcon active={active} /> },
  { path: '/courses', label: 'Courses', icon: (active: boolean) => <BookOpenIcon active={active} /> },
  { path: '/chat', label: 'Chat', icon: (active: boolean) => <ChatBubbleIcon active={active} /> },
  { path: '/profile', label: 'Profile', icon: (active: boolean) => <UserIcon active={active} /> },
];

const NavItem: React.FC<{ path: string; label: string; icon: (active: boolean) => React.ReactNode }> = ({ path, label, icon }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-brand-blue' : 'text-gray-400 hover:text-brand-blue'
      }`
    }
  >
    {({ isActive }) => (
      <>
        {icon(isActive)}
        <span className="text-xs font-bold mt-1">{label}</span>
      </>
    )}
  </NavLink>
);

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t-2 border-brand-stroke z-50 flex">
      {navItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  );
};

// SVG Icons
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill={active ? 'currentColor' : 'none'} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="5 12 3 12 12 3 21 12 19 12" />
    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
  </svg>
);
const BookOpenIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill={active ? 'currentColor' : 'none'} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
    <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
    <line x1="3" y1="6" x2="3" y2="19" />
    <line x1="12" y1="6" x2="12" y2="19" />
    <line x1="21" y1="6" x2="21" y2="19" />
  </svg>
);
const ChatBubbleIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill={active ? 'currentColor' : 'none'} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M21 15a3 3 0 0 1 -3 3h-9l-4 4v-13a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6z" />
  </svg>
);
const UserIcon = ({ active }: { active: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill={active ? 'currentColor' : 'none'} strokeLinecap="round" strokeLinejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="7" r="4" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
);

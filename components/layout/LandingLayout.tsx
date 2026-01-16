import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Mascot } from '../ui/Mascot';
import { useAuth } from '../../hooks/useAuth';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

export const LandingLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Landing Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-stroke">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Mascot size={42} expression="collapsed" className="group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black text-brand-purple tracking-tighter">Biolingo</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                  pathname === item.path ? 'text-brand-purple' : 'text-gray-500 hover:text-brand-purple'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex">Log In</Button>
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <Button variant="primary" size="sm" className="bg-brand-purple border-brand-purple/80 hover:bg-brand-purple/90">
                {isAuthenticated ? 'Dashboard' : 'Get Started'}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Landing Footer */}
      <footer className="bg-[#1C1C21] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Mascot size={40} expression="collapsed" />
              <span className="text-2xl font-black text-brand-purple tracking-tighter">Biolingo</span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300 max-w-sm font-bold text-lg">
                The world's most friendly way to learn Spanish.
              </p>
              <p className="text-gray-500 max-w-sm font-bold">
                Join millions of learners today.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-brand-purple transition-colors cursor-pointer text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <InstagramIcon />
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-brand-purple transition-colors cursor-pointer text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <TwitterIcon />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-gray-500">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li><Link to="/features" className="hover:text-brand-purple transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-purple transition-colors">Pricing</Link></li>
              <li><Link to="/testimonials" className="hover:text-brand-purple transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-gray-500">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-300">
              <li><Link to="/faq" className="hover:text-brand-purple transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-purple transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-purple transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-[10px] text-gray-600 font-black uppercase tracking-widest">
          © 2025 Biolingo Inc. 
        </div>
      </footer>
    </div>
  );
};
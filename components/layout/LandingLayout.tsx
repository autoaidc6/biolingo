import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Mascot } from '../ui/Mascot';
import { useAuth } from '../../hooks/useAuth';

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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-stroke">
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
                  pathname === item.path ? 'text-brand-purple' : 'text-slate-400 hover:text-brand-purple'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-500 font-bold">Log In</Button>
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/login"}>
              <Button variant="primary" size="sm" className="bg-brand-purple border-brand-purple/80 hover:brightness-110 transition-all px-6">
                {isAuthenticated ? 'Dashboard' : 'Join Now'}
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
      <footer className="bg-brand-text text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Mascot size={40} expression="collapsed" />
              <span className="text-2xl font-black text-brand-purple tracking-tighter">Biolingo</span>
            </div>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              Experience language learning through a biological lens. Adaptive, intelligent, and free forever.
            </p>
            <div className="flex gap-4 mt-8">
              {[1, 2].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-purple transition-colors cursor-pointer border border-slate-700">
                  <div className="w-5 h-5 bg-slate-400 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-slate-500">Discover</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-300">
              <li><Link to="/features" className="hover:text-brand-purple transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-purple transition-colors">Pricing</Link></li>
              <li><Link to="/testimonials" className="hover:text-brand-purple transition-colors">Community</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em] text-slate-500">Legal</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-300">
              <li><Link to="/faq" className="hover:text-brand-purple transition-colors">Help Center</Link></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
          Biolingo © 2025 • Evolution of Language
        </div>
      </footer>
    </div>
  );
};

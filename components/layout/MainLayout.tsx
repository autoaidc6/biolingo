import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Mascot } from '../ui/Mascot';

const sidebarItems = [
  { path: '/dashboard', label: 'Ecosystem', icon: '🏠' },
  { path: '/learn', label: 'Genetic Path', icon: '🧬' },
  { path: '/videos', label: 'Simulation', icon: '▶️' },
  { path: '/chat', label: 'Vocal Hub', icon: '💬' },
  { path: '/debate', label: 'Debate', icon: '📣' },
  { path: '/collection', label: 'Synapse Bank', icon: '🔖' },
  { path: '/profile', label: 'Evolution', icon: '👤' },
];

export const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-brand-snow flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-brand-stroke fixed h-full z-50 px-6">
        <div className="py-10">
           <div className="flex items-center gap-3 mb-16 px-4">
              <Mascot size={36} expression="collapsed" />
              <span className="text-2xl font-black text-brand-purple tracking-tighter">Biolingo</span>
           </div>
           
           <nav className="space-y-4">
             {sidebarItems.map((item) => (
               <NavLink
                 key={item.path}
                 to={item.path}
                 className={({ isActive }) =>
                   `flex items-center gap-5 px-5 py-4 rounded-2xl font-black transition-all group ${
                     isActive 
                       ? 'bg-brand-purple/5 text-brand-purple shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]' 
                       : 'text-slate-400 hover:bg-brand-snow hover:text-brand-text'
                   }`
                 }
               >
                 <span className={`text-xl transition-transform group-hover:scale-110`}>{item.icon}</span>
                 <span className="text-[11px] uppercase tracking-[0.2em]">{item.label}</span>
               </NavLink>
             ))}
           </nav>

           <div className="mt-20 px-5">
              <div className="bg-brand-snow border-2 border-brand-stroke rounded-3xl p-5">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Current Progress</p>
                 <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-purple w-[65%] rounded-full"></div>
                 </div>
                 <p className="text-[10px] font-black text-brand-purple mt-3 text-center">65% TO NEXT STAGE</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-72 pb-24 md:pb-12 pt-10 px-6 md:px-12 lg:px-20 w-full max-w-7xl">
        <div className="max-w-6xl mx-auto">
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

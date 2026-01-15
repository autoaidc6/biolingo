import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SpeakerIcon } from '../components/ui/Icons';
import { Mascot } from '../components/ui/Mascot';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="space-y-10 pb-16">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-stroke pb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-text tracking-tighter">
            HOLA, <span className="text-brand-purple">{user.name.split(' ')[0].toUpperCase()}</span>
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Continue your evolution</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-4 py-2 bg-white rounded-2xl border-2 border-brand-stroke flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <span className="font-black text-brand-text">{user.streak} Days</span>
           </div>
           <div className="px-4 py-2 bg-brand-purple/5 rounded-2xl border-2 border-brand-purple/20 flex items-center gap-2">
              <span className="text-xl">💎</span>
              <span className="font-black text-brand-purple">{user.points} XP</span>
           </div>
        </div>
      </header>

      {/* Word of the Day Card */}
      <Card className="p-10 border-brand-stroke shadow-soft relative overflow-hidden group border-b-8">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl group-hover:bg-brand-purple/10 transition-all"></div>
        <div className="space-y-8 relative z-10">
          <div>
            <div className="flex items-center justify-between mb-6">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Word of the Day</p>
               <span className="px-3 py-1 bg-brand-yellow/10 text-brand-yellow text-[9px] font-black rounded-full border border-brand-yellow/20">BIO-ADAPTIVE</span>
            </div>
            <div className="flex items-center gap-8">
               <h2 className="text-5xl font-black text-brand-text tracking-tighter">crecimiento</h2>
               <div className="flex items-center gap-3">
                  <button className="p-3 bg-brand-snow rounded-2xl hover:bg-brand-purple hover:text-white transition-all shadow-sm">
                    <SpeakerIcon className="w-6 h-6" />
                  </button>
                  <button className="p-3 bg-brand-snow rounded-2xl hover:text-brand-purple transition-all text-slate-400">🔖</button>
               </div>
            </div>
            <p className="text-xl font-bold text-slate-400 mt-2">growth</p>
          </div>
          
          <div className="pt-8 border-t border-brand-stroke">
            <div className="flex items-center gap-4">
               <h3 className="text-2xl font-extrabold text-brand-text tracking-tight">El crecimiento es necesario</h3>
               <button className="p-2 text-slate-300 hover:text-brand-purple transition-colors">
                  <SpeakerIcon className="w-4 h-4" />
               </button>
            </div>
            <p className="text-slate-500 mt-2 font-medium italic text-lg leading-relaxed">Growth is necessary</p>
          </div>
        </div>
      </Card>

      {/* Activity Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-brand-text uppercase tracking-tight">Active Ecosystem</h3>
          <Link to="/learn" className="text-xs font-black text-brand-purple hover:underline tracking-widest uppercase">Browse All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { path: '/learn', label: 'Curriculum', icon: '🧬', color: 'from-emerald-50 to-emerald-100', text: 'text-emerald-600' },
             { path: '/chat', label: 'Vocal Hub', icon: '💬', color: 'from-brand-purple/5 to-brand-purple/10', text: 'text-brand-purple' },
             { path: '/videos', label: 'Immersive', icon: '🎬', color: 'from-brand-blue/5 to-brand-blue/10', text: 'text-brand-blue' }
           ].map((item, idx) => (
             <Link key={idx} to={item.path} className="group">
                <Card className={`p-0 overflow-hidden border-b-[12px] hover:translate-y-[-8px] transition-all shadow-sm`}>
                   <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center text-7xl`}>{item.icon}</div>
                   <div className="p-6 flex items-center justify-between bg-white">
                      <span className={`font-black text-sm uppercase tracking-widest ${item.text}`}>{item.label}</span>
                      <span className={`${item.text} font-black text-xl`}>→</span>
                   </div>
                </Card>
             </Link>
           ))}
        </div>
      </section>

      {/* Skills Banner */}
      <div className="bg-gradient-to-r from-brand-text to-[#1e1e1e] rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between text-white shadow-2xl relative overflow-hidden">
         <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-brand-purple/10 rounded-full blur-[100px]"></div>
         <div className="flex items-center gap-8 relative z-10">
            <div className="bg-white/10 p-5 rounded-3xl text-4xl shadow-inner border border-white/10">🧪</div>
            <div>
               <h3 className="text-2xl font-black tracking-tighter leading-tight">Neural Assessment</h3>
               <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Update your learning profile</p>
            </div>
         </div>
         <Button className="mt-8 md:mt-0 bg-brand-yellow text-brand-text border-brand-yellow font-black px-12 py-4 shadow-xl shadow-brand-yellow/20 relative z-10">Start Quiz</Button>
      </div>
    </div>
  );
};

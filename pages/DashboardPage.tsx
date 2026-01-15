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
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-2xl font-bold text-brand-text flex items-center gap-3">
          <span className="text-3xl">👋</span> Welcome Onboard, {user.name.split(' ')[0]}
        </h1>
      </header>

      {/* Word of the Day Card */}
      <Card className="p-8 border-brand-stroke shadow-sm">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Word of the Day</p>
            <div className="flex items-center gap-6">
               <h2 className="text-4xl font-black text-brand-text">escritura</h2>
               <div className="flex items-center gap-3">
                  <button className="p-2 bg-brand-snow rounded-full hover:bg-brand-stroke transition-colors">
                    <SpeakerIcon className="w-5 h-5 text-slate-500" />
                  </button>
                  <button className="p-2 bg-brand-snow rounded-full hover:bg-brand-stroke transition-colors text-slate-500">🔖</button>
               </div>
            </div>
            <p className="text-lg font-medium text-slate-500 mt-2">writing</p>
          </div>
          
          <div className="pt-6 border-t border-brand-stroke">
            <div className="flex items-center gap-4">
               <h3 className="text-2xl font-bold text-brand-text">Esta es una escritura hermosa</h3>
               <button className="p-2 bg-brand-snow rounded-full hover:bg-brand-stroke transition-colors">
                  <SpeakerIcon className="w-4 h-4 text-slate-400" />
               </button>
               <button className="p-2 bg-brand-snow rounded-full hover:bg-brand-stroke transition-colors text-slate-400 text-sm">🔖</button>
            </div>
            <p className="text-slate-500 mt-1 font-medium italic">This is a beautiful writing</p>
          </div>
        </div>
      </Card>

      {/* Activity Grid */}
      <section>
        <h3 className="text-xl font-black text-brand-text mb-6">Learn, Practice and Discover</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Link to="/learn" className="group">
              <Card className="p-0 overflow-hidden border-b-8 hover:translate-y-[-4px] transition-all">
                 <div className="h-48 bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center text-6xl">📚</div>
                 <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className="text-brand-purple">📖</span>
                       <span className="font-bold text-sm text-slate-700">Learn new words</span>
                    </div>
                    <span className="text-brand-purple font-black">→</span>
                 </div>
              </Card>
           </Link>

           <Link to="/chat" className="group">
              <Card className="p-0 overflow-hidden border-b-8 hover:translate-y-[-4px] transition-all">
                 <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-6xl">💬</div>
                 <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className="text-brand-blue">💬</span>
                       <span className="font-bold text-sm text-slate-700">Start a new Chat</span>
                    </div>
                    <span className="text-brand-blue font-black">→</span>
                 </div>
              </Card>
           </Link>

           <Link to="/videos" className="group">
              <Card className="p-0 overflow-hidden border-b-8 hover:translate-y-[-4px] transition-all relative">
                 <div className="h-48 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-6xl">🎥</div>
                 <div className="absolute top-2 right-2 bg-brand-text text-white text-[10px] font-black px-2 py-1 rounded-md">#1</div>
                 <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <span className="text-brand-green">▶️</span>
                       <span className="font-bold text-sm text-slate-700">Watch a Video</span>
                    </div>
                    <span className="text-brand-green font-black">→</span>
                 </div>
              </Card>
           </Link>
        </div>
      </section>

      {/* Skills Banner */}
      <div className="bg-brand-purple rounded-3xl p-6 flex items-center justify-between text-white shadow-lg overflow-hidden relative">
         <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
         <div className="flex items-center gap-5 relative z-10">
            <div className="bg-white/20 p-3 rounded-2xl text-3xl">📄</div>
            <div>
               <h3 className="text-lg font-black leading-tight">Test your skills</h3>
               <p className="text-sm font-bold opacity-80 uppercase tracking-wider mt-1">Track your progress with a quiz</p>
            </div>
         </div>
         <Button className="bg-white text-brand-purple border-white hover:bg-slate-50 font-black px-8">Take Quiz</Button>
      </div>
    </div>
  );
};
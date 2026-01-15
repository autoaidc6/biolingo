import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Link } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8 pb-10">
      <h1 className="text-3xl font-black text-brand-text uppercase tracking-tight">Profile</h1>

      {/* User Info */}
      <div className="flex items-center gap-6">
        <img 
          src={user.avatarUrl} 
          alt={user.name} 
          className="w-20 h-20 rounded-full border-4 border-white shadow-soft"
        />
        <div>
          <h2 className="text-xl font-black text-brand-text leading-tight">{user.name}</h2>
          <p className="text-sm font-bold text-gray-400 mt-1">{user.email}</p>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="bg-brand-purple/5 border-2 border-brand-purple/20 rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden">
         <div className="absolute top-1/2 -left-10 -translate-y-1/2 w-24 h-24 bg-brand-purple/20 rounded-full flex items-center justify-center text-3xl">▶️</div>
         <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-24 h-24 bg-brand-purple/20 rounded-full flex items-center justify-center text-3xl">💬</div>
         
         <h3 className="text-3xl font-black text-brand-text tracking-tighter">Unlock Full Access</h3>
         <p className="text-gray-500 font-bold mt-4 max-w-md leading-relaxed">
           Enjoy unlimited access and all features for only $4.99 / Month. First 7 days are free!
         </p>
         <Button className="mt-8 bg-brand-purple border-brand-purple/80 hover:bg-brand-purple/90 px-12 font-black">
           Subscribe
         </Button>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {[
          { icon: '🔑', label: 'Change Password', path: '#' },
          { icon: '❓', label: 'Frequently Asked Questions', path: '/faq' },
        ].map(item => (
          <Link key={item.label} to={item.path} className="block">
            <Card className="flex items-center gap-4 py-4 px-6 hover:bg-brand-snow transition-colors border-brand-stroke">
               <span className="text-lg">{item.icon}</span>
               <span className="font-bold text-brand-text">{item.label}</span>
            </Card>
          </Link>
        ))}
        
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 py-4 px-6 rounded-3xl border-2 border-brand-stroke hover:bg-red-50 transition-colors"
        >
          <span className="text-lg">↪️</span>
          <span className="font-bold text-brand-text">Log out</span>
        </button>
      </div>
    </div>
  );
};

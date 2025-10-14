
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 text-center">
      <div className="flex flex-col items-center">
        <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg" />
        <h1 className="text-3xl font-bold text-brand-text mt-4">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <Card>
        <h2 className="text-xl font-bold text-brand-text mb-4">Statistics</h2>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-500">{user.streak}</p>
            <p className="text-sm text-gray-500">Day Streak</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-500">{user.points}</p>
            <p className="text-sm text-gray-500">Total Points</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">3</p>
            <p className="text-sm text-gray-500">Courses Started</p>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-xl font-bold text-brand-text mb-2">Settings</h2>
        <p className="text-gray-500">Settings page is under construction.</p>
      </Card>
      
      <Button variant="outline" fullWidth onClick={logout}>
        Log Out
      </Button>
    </div>
  );
};

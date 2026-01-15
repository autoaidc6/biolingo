import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Mascot } from './ui/Mascot';

type OnboardingState = 'welcome' | 'login' | 'signup';

export const Onboarding: React.FC = () => {
  const [formState, setFormState] = useState<OnboardingState>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signUp, configError, loginAsGuest } = useAuth();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const action = formState === 'login' 
        ? () => login(email, password)
        : () => signUp(name, email, password);

    const { error } = await action();

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (formState === 'login' || formState === 'signup') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center p-6">
        <button onClick={() => { setFormState('welcome'); setError(null); }} className="absolute top-4 left-4 text-gray-500 font-bold text-2xl" disabled={isLoading}>&times;</button>
        <div className="flex justify-center mb-6">
           <Mascot size={100} expression="thinking" />
        </div>
        <h2 className="text-2xl font-bold text-brand-text text-center mb-8">
            {formState === 'login' ? 'Log in to your account' : 'Create an account'}
        </h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">{error}</p>}
        {configError && <p className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center mb-4 text-sm">Offline Mode: Database not configured.</p>}
        <form onSubmit={handleAuthAction} className="space-y-6">
            {formState === 'signup' && <Input id="name" label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required disabled={false} />}
            <Input id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required disabled={false} />
            <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required disabled={false} />
            <Button type="submit" fullWidth disabled={isLoading}>
                {isLoading ? 'Loading...' : formState === 'login' ? 'Log In' : 'Create Account'}
            </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col bg-gradient-to-b from-green-50 via-white to-white">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <Mascot size={180} showBubble="Welcome back!" />
        <h1 className="text-4xl font-extrabold text-brand-text mt-8">Learn with Ustaza!</h1>
        <p className="text-gray-500 mt-2 text-lg">The fun, free way to master Spanish.</p>
      </div>
      <div className="p-6 space-y-3 bg-white">
        {configError && <p className="text-yellow-800 bg-yellow-100 p-3 rounded-lg text-center text-sm mb-2">Note: Running in Guest Mode (Offline)</p>}
        <Button fullWidth onClick={() => setFormState('signup')}>Get Started</Button>
        <Button variant="outline" fullWidth onClick={() => setFormState('login')}>I already have an account</Button>
        <div className="mt-2 text-center">
            <button onClick={loginAsGuest} className="text-gray-500 font-medium text-sm hover:text-brand-green underline py-2">
                Continue as Guest
            </button>
        </div>
      </div>
    </div>
  );
};

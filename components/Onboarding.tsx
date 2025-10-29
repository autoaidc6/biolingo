import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const LogoIcon = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" fill="#58CC02"/>
        <path d="M12 7c-2 0-3 1-3.5 2.5C8 11 9 12 11 12h2c2 0 3-1 3-2.5S14 7 12 7z" fill="white"/>
        <path d="M12 17c2 0 3-1 3.5-2.5C16 13 15 12 13 12h-2c-2 0-3 1-3 2.5S10 17 12 17z" fill="white"/>
    </svg>
);

type OnboardingState = 'welcome' | 'login' | 'signup';

export const Onboarding: React.FC = () => {
  const [formState, setFormState] = useState<OnboardingState>('welcome');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signUp, configError } = useAuth();

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
    // On success, the AuthContext's onAuthStateChange will handle navigation.
  };

  if (formState === 'login' || formState === 'signup') {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center p-6">
        <button onClick={() => { setFormState('welcome'); setError(null); }} className="absolute top-4 left-4 text-gray-500 font-bold text-2xl" disabled={isLoading}>&times;</button>
        <h2 className="text-2xl font-bold text-brand-text text-center mb-8">
            {formState === 'login' ? 'Log in to your account' : 'Create an account'}
        </h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4">{error}</p>}
        {configError && <p className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center mb-4">{configError}</p>}
        <form onSubmit={handleAuthAction} className="space-y-6">
            {formState === 'signup' && <Input id="name" label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required disabled={!!configError} />}
            <Input id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required disabled={!!configError} />
            <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required disabled={!!configError} />
            <Button type="submit" fullWidth disabled={isLoading || !!configError}>
                {isLoading ? 'Loading...' : formState === 'login' ? 'Log In' : 'Create Account'}
            </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col bg-gradient-to-b from-green-50 via-white to-white">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <LogoIcon />
        <h1 className="text-4xl font-extrabold text-brand-text mt-4">Welcome to Biolingo!</h1>
        <p className="text-gray-500 mt-2 text-lg">The fun, free way to learn a new language.</p>
      </div>
      <div className="p-6 space-y-3 bg-white">
        {configError && <p className="text-yellow-800 bg-yellow-100 p-3 rounded-lg text-center text-sm mb-2">{configError}</p>}
        <Button fullWidth onClick={() => setFormState('signup')} disabled={!!configError}>Get Started</Button>
        <Button variant="outline" fullWidth onClick={() => setFormState('login')} disabled={!!configError}>I already have an account</Button>
      </div>
    </div>
  );
};
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
      <div className="min-h-screen bg-white flex flex-col justify-center p-8">
        <button onClick={() => { setFormState('welcome'); setError(null); }} className="absolute top-8 left-8 text-gray-400 font-black text-3xl p-2" disabled={isLoading}>&times;</button>
        <div className="flex justify-center mb-10">
           <Mascot size={120} expression="thinking" />
        </div>
        <h2 className="text-3xl font-black text-brand-text text-center mb-10 tracking-tight uppercase">
            {formState === 'login' ? 'Welcome Back!' : 'Join the Club'}
        </h2>
        {error && <p className="bg-brand-red/10 text-brand-red font-bold p-4 rounded-2xl text-center mb-6 text-sm border-2 border-brand-red/20">{error}</p>}
        <form onSubmit={handleAuthAction} className="space-y-6 max-w-sm mx-auto w-full">
            {formState === 'signup' && <Input id="name" label="Full Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required disabled={isLoading} />}
            <Input id="email" label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@biolingo.com" required disabled={isLoading} />
            <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required disabled={isLoading} />
            <div className="pt-4">
              <Button type="submit" fullWidth disabled={isLoading} size="lg">
                  {isLoading ? '...' : formState === 'login' ? 'Log In' : 'Sign Up'}
              </Button>
            </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-8 relative">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl"></div>
        
        <Mascot size={220} showBubble="HOLA! LET'S LEARN!" className="mb-8" />
        <h1 className="text-5xl font-black text-brand-text mt-6 tracking-tighter uppercase leading-none">
          Biolingo
        </h1>
        <p className="text-gray-400 mt-4 text-sm font-bold uppercase tracking-[0.2em] max-w-xs leading-relaxed">
          Master Spanish the fun and easy way.
        </p>
      </div>
      <div className="p-10 space-y-4 bg-brand-snow border-t-2 border-brand-stroke">
        {configError && <p className="text-brand-yellow font-bold text-center text-[10px] uppercase tracking-widest mb-2">Guest Mode • Offline</p>}
        <Button fullWidth onClick={() => setFormState('signup')} size="lg">Get Started</Button>
        <Button variant="outline" fullWidth onClick={() => setFormState('login')} size="lg">I Have an Account</Button>
        <div className="mt-4 text-center">
            <button onClick={loginAsGuest} className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-brand-blue transition-colors py-2">
                Browse as Guest
            </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Mascot } from '../components/ui/Mascot';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, signUp, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const action = isLogin 
        ? () => login(email, password)
        : () => signUp(name, email, password);

    const { error } = await action();

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] bg-brand-snow flex flex-col items-center justify-center p-6 py-20">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-10">
           <Mascot size={120} expression="thinking" />
        </div>
        
        <div className="bg-white border-2 border-brand-stroke rounded-3xl p-10 shadow-soft border-b-8">
          <h2 className="text-3xl font-black text-brand-text text-center mb-10 tracking-tight uppercase">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          
          {error && <p className="bg-brand-red/10 text-brand-red font-bold p-4 rounded-2xl text-center mb-6 text-sm border-2 border-brand-red/20">{error}</p>}
          
          <form onSubmit={handleAuthAction} className="space-y-6">
              {!isLogin && <Input id="name" label="Full Name" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required disabled={isLoading} />}
              <Input id="email" label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@biolingo.com" required disabled={isLoading} />
              <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required disabled={isLoading} />
              
              <div className="pt-4 space-y-4">
                <Button type="submit" fullWidth disabled={isLoading} size="lg" className="bg-brand-purple border-brand-purple/80">
                    {isLoading ? '...' : isLogin ? 'Log In' : 'Sign Up'}
                </Button>
                
                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-brand-stroke"></div>
                  <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">or</span>
                  <div className="flex-grow border-t border-brand-stroke"></div>
                </div>

                <Button variant="outline" fullWidth onClick={loginAsGuest} type="button">
                    Continue as Guest
                </Button>
              </div>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-brand-purple transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

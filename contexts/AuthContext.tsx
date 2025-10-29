import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabase, getProfile, supabaseError } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (name: string, email: string, password: string) => Promise<{ error: any }>;
  logout: () => void;
  isLoading: boolean;
  updateLearningGoal: (goal: string) => Promise<void>;
  configError: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
        setIsLoading(false);
        return;
    }
    // Check for an active session on initial load
    supabase.auth.getSession().then(async ({ data: { session } }) => {
        setSession(session);
        if (session) {
            const profile = await getProfile(session.user.id, session.user.email!, session.user.user_metadata);
            setUser(profile);
        }
        setIsLoading(false);
    });


    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
            const profile = await getProfile(session.user.id, session.user.email!, session.user.user_metadata);
            setUser(profile);
        } else {
            setUser(null);
        }
        // Set loading to false once we have a session or know there isn't one.
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!supabase) return { error: { message: supabaseError } };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!supabase) return { error: { message: supabaseError } };
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                // A Supabase trigger can use this metadata to create a public.profiles entry
            },
        },
    });
    return { error };
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const updateLearningGoal = async (goal: string) => {
    if (user && supabase) {
      const updatedUser = { ...user, learningGoal: goal };
      setUser(updatedUser); // Optimistic update
      
      const { error } = await supabase
        .from('profiles')
        .update({ learning_goal: goal })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating learning goal:", error);
        // Revert on failure
        setUser(user);
        alert("Failed to update your learning goal. Please try again.");
      }
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!session,
    login,
    signUp,
    logout,
    isLoading,
    updateLearningGoal,
    configError: supabaseError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
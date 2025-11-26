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
    let mounted = true;

    const initializeAuth = async () => {
      if (!supabase) {
        if (mounted) setIsLoading(false);
        return;
      }

      try {
        // Check for an active session on initial load
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
            console.warn("Error getting session:", error.message);
        }

        if (mounted) {
            setSession(initialSession);
            if (initialSession) {
                const profile = await getProfile(initialSession.user.id, initialSession.user.email!, initialSession.user.user_metadata);
                if (mounted) setUser(profile);
            }
        }
      } catch (err) {
        console.error("Unexpected error during auth initialization:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase 
        ? supabase.auth.onAuthStateChange(async (_event, newSession) => {
            if (!mounted) return;
            
            setSession(newSession);
            
            if (newSession) {
                // Only fetch profile if the user ID has changed or we don't have a user yet
                if (!user || user.id !== newSession.user.id) {
                    setIsLoading(true); // Show loading while switching users
                    const profile = await getProfile(newSession.user.id, newSession.user.email!, newSession.user.user_metadata);
                    if (mounted) {
                        setUser(profile);
                        setIsLoading(false);
                    }
                }
            } else {
                setUser(null);
                setIsLoading(false);
            }
          })
        : { data: { subscription: { unsubscribe: () => {} } } };

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []); // Remove user dependency to avoid loop

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
    setSession(null);
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
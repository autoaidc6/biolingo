import React, { createContext, useState, useEffect, ReactNode, useRef } from 'react';
import { User } from '../types';
import { supabase, getProfile, supabaseError } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { MOCK_USER } from '../constants';

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
  loginAsGuest: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with MOCK_USER to bypass authentication requirement by default
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userIdRef = useRef<string | null>(MOCK_USER.id);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      // If Supabase is not configured, we stick with the MOCK_USER (Guest Mode)
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
            if (initialSession) {
                setSession(initialSession);
                userIdRef.current = initialSession.user.id;
                const profile = await getProfile(initialSession.user.id, initialSession.user.email!, initialSession.user.user_metadata);
                setUser(profile);
            } else {
                // If we have Supabase but no session, we CAN clear the user to force login.
                // However, to keep "auth removed" feel, we could leave MOCK_USER. 
                // But standard behavior is: if auth exists, enforce it. 
                // Since the user asked to "remove authentication", we will NOT clear MOCK_USER here
                // unless we want to strictly enforce real auth when available.
                // For now, let's allow MOCK_USER to persist if no session is found, 
                // or clear it only if we want to force the Onboarding screen.
                // Current decision: Clear it to allow 'real' login if desired, but Onboarding now supports Guest.
                setUser(null);
                userIdRef.current = null;
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
        ? supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (!mounted) return;
            
            // Ignore token refresh events for UI updates to prevent reloading profile
            if (event === 'TOKEN_REFRESHED') {
                setSession(newSession);
                return;
            }

            setSession(newSession);
            
            if (newSession) {
                // Only fetch profile if the user ID has actually changed
                if (newSession.user.id !== userIdRef.current) {
                    setIsLoading(true); 
                    userIdRef.current = newSession.user.id;

                    try {
                        const profile = await getProfile(newSession.user.id, newSession.user.email!, newSession.user.user_metadata);
                        if (mounted) {
                            setUser(profile);
                        }
                    } catch (err) {
                        console.error("Error fetching profile on auth change:", err);
                    } finally {
                        if (mounted) setIsLoading(false);
                    }
                }
            } else {
                // User signed out
                if (mounted) {
                    setUser(null);
                    userIdRef.current = null;
                    setIsLoading(false);
                }
            }
          })
        : { data: { subscription: { unsubscribe: () => {} } } };

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!supabase) {
        // Fallback for Guest Mode when backend is missing
        console.log("Supabase not configured. Logging in as guest.");
        setUser(MOCK_USER);
        userIdRef.current = MOCK_USER.id;
        return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (name: string, email: string, password: string) => {
    if (!supabase) {
        // Fallback for Guest Mode when backend is missing
        console.log("Supabase not configured. Creating guest account.");
        const newUser = { ...MOCK_USER, name, email, id: 'guest-' + Date.now() };
        setUser(newUser);
        userIdRef.current = newUser.id;
        return { error: null };
    }
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

  const loginAsGuest = () => {
      setUser(MOCK_USER);
      userIdRef.current = MOCK_USER.id;
  };

  const logout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    userIdRef.current = null;
  };

  const updateLearningGoal = async (goal: string) => {
    if (user) {
      const updatedUser = { ...user, learningGoal: goal };
      setUser(updatedUser); // Optimistic update
      
      if (supabase) {
        const { error } = await supabase
            .from('profiles')
            .update({ learning_goal: goal })
            .eq('id', user.id);

        if (error) {
            console.error("Error updating learning goal:", error);
            // We don't revert here in guest mode, just log error
        }
      }
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user, // Consider authenticated if we have a user object (real or mock)
    login,
    signUp,
    logout,
    isLoading,
    updateLearningGoal,
    configError: supabaseError,
    loginAsGuest
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
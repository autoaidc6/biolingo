
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { MOCK_USER } from '../constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateLearningGoal: (goal: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage to persist session
    try {
      const storedUser = localStorage.getItem('biolingo_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('biolingo_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock API call
    console.log(`Attempting login with ${email} and ${password}`);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const loggedInUser = MOCK_USER;
        setUser(loggedInUser);
        localStorage.setItem('biolingo_user', JSON.stringify(loggedInUser));
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('biolingo_user');
  };

  const updateLearningGoal = (goal: string) => {
    if (user) {
      const updatedUser = { ...user, learningGoal: goal };
      setUser(updatedUser);
      localStorage.setItem('biolingo_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
    updateLearningGoal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const isAuthenticated = currentUser !== null;

  const login = (email: string, password: string) => {
    // In a real app, validate against backend
    // Here we just check if the user exists in our mock data
    // and assume password is "password" for all users
    const user = users.find(u => u.email === email);
    
    if (user && password === 'password') {
      setCurrentUser(user);
      toast.success("Login successful!");
      return true;
    }
    
    toast.error("Invalid email or password!");
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      toast.error("User with this email already exists!");
      return false;
    }

    // In a real app, we would send this to a backend API
    const newUser: User = {
      id: `${users.length + 1}`,
      name,
      email,
      isAdmin: false,
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    toast.success("Registration successful!");
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success("You've been logged out!");
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

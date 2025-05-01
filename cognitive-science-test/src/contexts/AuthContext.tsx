import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Fetch user data when token exists
      const fetchUser = async () => {
        try {
          const userData = await auth.getUser();
          setUser(userData);
        } catch (error) {
          // If token is invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
        }
      };
      fetchUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await auth.login({ email, password });
      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        navigate('/questions');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to login. Please check your credentials.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await auth.register({ email, password, name });
      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        navigate('/questions');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register. Please try again.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
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
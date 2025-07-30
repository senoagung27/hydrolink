import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  token: string | null;
  isLoading: boolean; // Tambahkan isLoading
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state isLoading

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (e) {
        console.error("Failed to load token", e);
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        'https://reqres.in/api/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1',
          },
        }
      );

      const responseToken = res.data?.token;
      if (!responseToken) throw new Error('No token returned from login');

      await AsyncStorage.setItem('token', responseToken);
      setToken(responseToken); // Set token akan memicu re-render di layout
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : (error as Error).message;
      throw new Error(`Login failed: ${message}`);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
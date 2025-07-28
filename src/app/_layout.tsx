import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments, Stack as ExpoStack } from 'expo-router';
import { Stack as StackGroup } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, createContext, useContext, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { NotesProvider } from '../context/NotesContext';
import { useColorScheme } from '../hooks/useColorScheme';

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signIn = () => {
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      setIsAuthenticated(false);
    }, 100);
    return () => clearTimeout(checkAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function InitialLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loaded) {
      return;
    }

    const inAuthGroup = segments[0] === 'login';

    // Defer navigation using setTimeout to ensure the Root Layout component is mounted
    if (!isAuthenticated && !inAuthGroup) {
      setTimeout(() => {
        router.replace('/login');
      }, 0);
    } else if (isAuthenticated && inAuthGroup) {
      setTimeout(() => {
        router.replace('/(tabs)/saved-jobs');
      }, 0);
    }
  }, [isAuthenticated, loaded, segments]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <ExpoStack>
            {isAuthenticated ? (
              <StackGroup>
                <ExpoStack.Screen name="(tabs)" options={{ headerShown: false }} />
                <ExpoStack.Screen name="job-detail/job-detail/[id]" options={{ headerShown: false }} />
                <ExpoStack.Screen name="+not-found" />
              </StackGroup>
            ) : (
              <StackGroup>
                <ExpoStack.Screen name="login" options={{ headerShown: false }} />
              </StackGroup>
            )}
          </ExpoStack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <NotesProvider>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </NotesProvider>
  );
}
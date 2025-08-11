// src/app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { JobProvider } from '../context/JobContext';
import { NotesProvider } from '../context/NotesContext';
import { useColorScheme } from '../hooks/useColorScheme';
import { AddJobProvider } from '../context/AddJobContext';
import SplashScreen from './screens/SplashScreen';

function RootLayoutNav() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setIsAppReady(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || !isAppReady) return;
    const inAuthFlow = segments[0] === 'login' || segments[0] === 'onboard';
    if (token && inAuthFlow) router.replace('/(tabs)');
    else if (!token && !inAuthFlow) router.replace('/onboard');
  }, [token, isLoading, isAppReady, segments, router]);

  if (!isAppReady || isLoading) return <SplashScreen />;

  return (
    <Stack>
      <Stack.Screen name="onboard" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="job-detail/job-detail" options={{ title: 'Job Detail' }} />
      <Stack.Screen name="select-job-position" options={{ headerShown: false }} />
      <Stack.Screen name="select-location" options={{ headerShown: false }} />
      <Stack.Screen name="select-company" options={{ headerShown: false }} />
      <Stack.Screen name="add-job-description" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/add-job" options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="edit-job" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) return null;

  return (
    <AuthProvider>
      <JobProvider>
        <NotesProvider>
          <AddJobProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DarkTheme}>
              <SafeAreaProvider>
                <RootLayoutNav />
                <StatusBar style="auto" />
              </SafeAreaProvider>
            </ThemeProvider>
          </AddJobProvider>
        </NotesProvider>
      </JobProvider>
    </AuthProvider>
  );
}
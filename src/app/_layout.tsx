// src/app/_layout.tsx

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { JobProvider } from '../context/JobContext';
import { NotesProvider } from '../context/NotesContext';
import { useColorScheme } from '../hooks/useColorScheme';

function RootLayoutNav() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const inAuthFlow = segments[0] === 'login';

    if (token && inAuthFlow) {
      router.replace('/(tabs)');
    } else if (!token && !inAuthFlow) {
      router.replace('/login');
    }
  }, [token, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="job-detail/job-detail" options={{ title: 'Job Detail' }} />
      <Stack.Screen name="select-job-position" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/add-job" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <JobProvider>
        <NotesProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SafeAreaProvider>
              <RootLayoutNav />
              <StatusBar style="auto" />
            </SafeAreaProvider>
          </ThemeProvider>
        </NotesProvider>
      </JobProvider>
    </AuthProvider>
  );
}
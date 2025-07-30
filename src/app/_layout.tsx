import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '../context/AuthContext'; // <-- Gunakan AuthContext yang benar
import { JobProvider } from '../context/JobContext';
import { NotesProvider } from '../context/NotesContext';
import { useColorScheme } from '../hooks/useColorScheme';

function RootLayoutNav() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Jangan lakukan apa-apa jika masih loading

    const inTabsGroup = segments[0] === '(tabs)';

    if (token && !inTabsGroup) {
      // Arahkan ke home jika pengguna punya token tapi tidak di dalam grup (tabs)
      router.replace('/(tabs)');
    } else if (!token && inTabsGroup) {
      // Arahkan ke login jika pengguna tidak punya token tapi mencoba akses (tabs)
      router.replace('/login');
    }
  }, [token, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      {/* Rute yang tidak dilindungi (login) */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Rute yang dilindungi (tabs dan detail) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="job-detail/job-detail" options={{ title: 'Job Detail' }} />
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
    // Bungkus semua provider di dalam AuthProvider yang benar
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
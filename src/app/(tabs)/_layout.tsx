import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Impor FontAwesome untuk ikon tab
import { FontAwesome } from '@expo/vector-icons'; 

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/ui/IconSymbol';
import TabBarBackground from '../../components/ui/TabBarBackground';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      
      {/* Tab baru Anda untuk Saved Jobs */}
      <Tabs.Screen
        name="saved-jobs" // Ini harus cocok dengan nama file baru Anda
        options={{
          title: 'Saved Jobs',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bookmark" color={color} />,
        }}
      />

      {/* Tab baru untuk halaman Cards */}
      <Tabs.Screen
        name="cards-example"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="clone" color={color} />,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
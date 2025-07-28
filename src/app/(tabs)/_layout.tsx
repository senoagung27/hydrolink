import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';

import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { HapticTab } from '../../components/HapticTab';
import TabBarBackground from '../../components/ui/TabBarBackground'; // This might be undefined on web/android, but it's okay.

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault, // Set a default background
        },
        tabBarBackground: () => <TabBarBackground />, // Use TabBarBackground if defined
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused ? 'house.fill' : 'house.fill'} color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused ? 'paperplane.fill' : 'paperplane.fill'} color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />
      <Tabs.Screen
        name="saved-jobs"
        options={{
          title: 'Saved Jobs',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/images/favicon.png')} // cite: 6
              style={{ tintColor: color, width: 24, height: 24 }}
            />
          ),
          tabBarButton: HapticTab,
        }}
      />
      <Tabs.Screen
        name="cards-example"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused ? 'chevron.left.forwardslash.chevron.right' : 'chevron.left.forwardslash.chevron.right'} color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />
    </Tabs>
  );
}

// Remove the styles if they are no longer needed, or adjust them for the Tabs component if necessary.
const styles = StyleSheet.create({
  // No longer needed if using default Tabs behavior or adjusted within Tabs screenOptions
});
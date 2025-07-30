import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { HapticTab } from '../../components/HapticTab';
import TabBarBackground from '../../components/ui/TabBarBackground';

// Import your screen components
import HomeScreen from './index';
import ExploreScreen from './explore';
import SavedJobsScreen from './saved-jobs';
import CardsExampleScreen from './cards-example';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault,
        },
        tabBarBackground: () => <TabBarBackground />,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused ? 'house.fill' : 'house.fill'} color={color} />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused ? 'paperplane.fill' : 'paperplane.fill'} color={color} />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          title: 'Saved Jobs',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../../assets/images/favicon.png')}
              style={{ tintColor: color, width: 24, height: 24 }}
            />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="CardsExample"
        component={CardsExampleScreen}
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol name={focused ? 'chevron.left.forwardslash.chevron.right' : 'chevron.left.forwardslash.chevron.right'} color={color} />
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
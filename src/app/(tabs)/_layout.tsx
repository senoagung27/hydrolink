// src/app/(tabs)/_layout.tsx
import { createBottomTabNavigator, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router'; // <-- Impor useRouter

import { HapticTab } from '../../components/HapticTab';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

// Import all necessary screen components
import HomeScreen from './index';
import ExploreScreen from './explore';
import SavedJobsScreen from './saved-jobs';
import AddJobScreen from './add-job';
import MessagesScreen from './messages';

const Tab = createBottomTabNavigator();

const CustomAddButton = ({ children, onPress }: BottomTabBarButtonProps) => (
    <TouchableOpacity
        style={{
            top: -25,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow,
        }}
        onPress={onPress}
    >
        <View
            style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#4338CA',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </View>
    </TouchableOpacity>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tint;
  const inactiveColor = Colors[colorScheme ?? 'light'].tabIconDefault;
  const router = useRouter(); // <-- Buat instance router

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 15,
          right: 15,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 60,
          ...styles.shadow,
        },
      }}>
      {/* ... (Tab.Screen untuk Home, Explore, Messages, SavedJobs tetap sama) ... */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="home" size={26} color={focused ? activeColor : inactiveColor} />
            </View>
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="share-alt" size={26} color={focused ? activeColor : inactiveColor} />
            </View>
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />

      {/* PERBARUI BAGIAN INI */}
      <Tab.Screen
        name="add-job" // Sesuaikan nama dengan nama berkas
        component={AddJobScreen}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Mencegah navigasi default
            router.push('/(tabs)/add-job'); // Buka modal sebagai gantinya
          },
        }}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="plus" size={24} color="#ffffff" />
          ),
          tabBarButton: (props) => <CustomAddButton {...props} />,
        }}
      />
      
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome name="comment-o" size={26} color={focused ? activeColor : inactiveColor} />
            </View>
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{
          title: 'Saved Jobs',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
                <FontAwesome name="bookmark-o" size={26} color={focused ? activeColor : inactiveColor} />
            </View>
          ),
          tabBarButton: (props) => <HapticTab {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
        elevation: 5,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: Platform.OS === 'ios' ? 5 : 0,
    }
});
// src/components/Header.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemedText } from './ThemedText'; // Assuming ThemedText is in the same components directory
import { Colors } from '../constants/Colors';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.header}>
      <ThemedText type="title" style={styles.welcomeText}>{title}</ThemedText>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E2D',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.icon,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
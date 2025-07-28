// src/components/SocialAuthButton.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface SocialAuthButtonProps {
  title: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}

export function SocialAuthButton({ title, icon, onPress }: SocialAuthButtonProps) {
  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Image
        source={icon}
        style={styles.googleIcon}
      />
      <Text style={styles.googleButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6EBF5',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#1E1E2D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
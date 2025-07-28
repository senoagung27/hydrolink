// src/components/Checkbox.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface CheckboxProps {
  isChecked: boolean;
  onPress: () => void;
}

export function Checkbox({ isChecked, onPress }: CheckboxProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      {isChecked && <View style={styles.checkedIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.icon,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#1DA1F2', // Or a primary color
  },
});
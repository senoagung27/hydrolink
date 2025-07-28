// src/components/FormInput.tsx
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { ThemedText } from './ThemedText'; // Assuming ThemedText is in the same components directory

interface FormInputProps extends TextInputProps {
  label: string;
}

export function FormInput({ label, style, ...rest }: FormInputProps) {
  return (
    <View>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#1E1E2D', // Use a specific color if Colors.light.text is not universally suitable
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});
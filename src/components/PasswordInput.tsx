// src/components/PasswordInput.tsx
import React, { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, Image, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '../constants/Colors';

interface PasswordInputProps extends TextInputProps {
  label: string;
}

export function PasswordInput({ label, style, ...rest }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={[styles.passwordContainer]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="********"
          secureTextEntry={!showPassword}
          {...rest}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Image
            source={require('../../src/assets/images/adaptive-icon.png')} // Make sure this path is correct
            style={{ width: 24, height: 24, tintColor: Colors.light.icon }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#1E1E2D',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
});
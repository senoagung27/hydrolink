import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  isActive: boolean; // <-- Tambahkan prop ini
  style?: any;
  textStyle?: any;
};

export function ThemedButton({
  title,
  onPress,
  isActive,
  style,
  textStyle,
}: ThemedButtonProps) {
  // Hapus state internal 'isActive'
  const activeColor = useThemeColor({}, 'tint');
  const inactiveColor = useThemeColor({}, 'tagBackground');
  const activeTextColor = useThemeColor({}, 'background');
  const inactiveTextColor = useThemeColor({}, 'text');

  return (
    <TouchableOpacity
      style={[
        styles.button,
        // Gunakan prop 'isActive' untuk menentukan style
        { backgroundColor: isActive ? activeColor : inactiveColor },
        style,
      ]}
      onPress={onPress} // Gunakan 'onPress' secara langsung
    >
      <Text
        style={[
          { color: isActive ? activeTextColor : inactiveTextColor },
          styles.buttonText,
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    fontWeight: '500',
  },
});
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedButtonProps = {
  title: string;
  onPress: () => void;
};

export function ThemedButton({ title, onPress }: ThemedButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const activeColor = useThemeColor({}, 'tint');
  const inactiveColor = useThemeColor({}, 'tagBackground');
  const activeTextColor = useThemeColor({}, 'background');
  const inactiveTextColor = useThemeColor({}, 'text');

  const handlePress = () => {
    setIsActive(!isActive);
    onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isActive ? activeColor : inactiveColor },
      ]}
      onPress={handlePress}
    >
      <Text style={{ color: isActive ? activeTextColor : inactiveTextColor }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
});
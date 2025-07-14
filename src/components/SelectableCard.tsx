import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '../constants/Colors';

export type SelectableCardProps = {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
};

export const SelectableCard = ({ title, isSelected, onSelect }: SelectableCardProps) => (
  <TouchableOpacity onPress={onSelect}>
    <View style={[styles.card, isSelected && styles.selectedCard]}>
      <ThemedText>{title}</ThemedText>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: 'red',
  },
});
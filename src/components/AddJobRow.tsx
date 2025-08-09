import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface AddJobRowProps {
  label: string;
  value?: string | null;
  onPress: () => void;
}

export const AddJobRow = ({ label, value, onPress }: AddJobRowProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {value ? (
        <View style={styles.valueContainer}>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.valueText}>{value}</Text>
        </View>
      ) : (
        <Text style={styles.labelText}>{label}</Text>
      )}
      
      {value ? (
         <FontAwesome name="pencil" size={20} color="#F9774E" />
      ) : (
        <Text style={styles.plusIcon}>+</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#B0B0B0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  valueContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 16,
    color: '#1E1E2D',
    fontWeight: '500',
  },
  valueText: {
    fontSize: 14,
    color: '#687076',
    marginTop: 4,
  },
  plusIcon: {
    fontSize: 26,
    color: '#F9774E',
    fontWeight: '300',
  },
});
// src/components/WorkplaceTypeModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

const WORKPLACE_OPTIONS = [
  {
    key: 'On-site',
    title: 'On-site',
    description: 'Employees come to work',
  },
  {
    key: 'Hybrid',
    title: 'Hybrid',
    description: 'Employees work directly on site or off site',
  },
  {
    key: 'Remote',
    title: 'Remote',
    description: 'Employees working off site',
  },
];

interface WorkplaceTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  currentValue: string;
}

export const WorkplaceTypeModal = ({
  visible,
  onClose,
  onSelect,
  currentValue,
}: WorkplaceTypeModalProps) => {
  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.grabber} />
              <Text style={styles.modalTitle}>Choose the type of workplace</Text>
              <Text style={styles.modalSubtitle}>
                Decide and choose the type of place to work according to what you want
              </Text>

              {WORKPLACE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={styles.optionButton}
                  onPress={() => handleSelect(option.key)}>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>{option.description}</Text>
                  </View>
                  <View style={styles.radioCircle}>
                    {currentValue === option.key && <View style={styles.radioSelected} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  grabber: {
    width: 48,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 2.5,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E2D',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#687076',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E1E2D',
  },
  optionDescription: {
    fontSize: 12,
    color: '#687076',
    marginTop: 2,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F9774E',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#F9774E',
  },
});
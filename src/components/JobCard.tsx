import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Colors } from '../constants/Colors';
import { Job, JobCardProps } from '../types/job';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { EditJobModal } from './EditJobModal';
import { ThemedText } from './ThemedText';

export const JobCard = ({ job, onDelete, onUpdate }: JobCardProps) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleDeletePress = () => {
    setOptionsModalVisible(false);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = () => {
    onDelete(job.id);
    setConfirmDeleteVisible(false);
  };

  const handleEditPress = () => {
    setOptionsModalVisible(false);
    setEditModalVisible(true);
  };

  const handleUpdate = (updatedJob: Job) => {
    onUpdate(updatedJob);
    setEditModalVisible(false);
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.companyInfo}>
            <View
              style={[
                styles.logoContainer,
                { backgroundColor: job.logoBackgroundColor },
              ]}>
              <FontAwesome
                name={job.logo as any}
                size={24}
                color={job.logoColor}
              />
            </View>
            <View>
              <ThemedText style={styles.jobTitle}>{job.title}</ThemedText>
              <ThemedText style={styles.companyLocation}>
                {job.company} &middot; {job.location}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity onPress={() => setOptionsModalVisible(true)}>
            <FontAwesome name="ellipsis-v" size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.tagsContainer}>
          {job.tags?.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.cardFooter}>
          <ThemedText style={styles.postedText}>{job.posted}</ThemedText>
          <ThemedText style={styles.salaryText}>{job.salary}</ThemedText>
        </View>
      </View>

      {/* Modal for Edit and Delete options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={() => setOptionsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setOptionsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleEditPress}>
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Colors.light.icon}
                  />
                  <Text style={styles.modalOptionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleDeletePress}>
                  <FontAwesome
                    name="trash"
                    size={20}
                    color={Colors.light.deleteButton}
                  />
                  <Text
                    style={[
                      styles.modalOptionText,
                      { color: Colors.light.deleteButton },
                    ]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Use the new ConfirmDeleteModal component */}
      <ConfirmDeleteModal
        visible={confirmDeleteVisible}
        onClose={() => setConfirmDeleteVisible(false)}
        onConfirm={confirmDelete}
        title="Hapus Pekerjaan"
        message="Apakah Anda yakin ingin menghapus pekerjaan ini?"
      />

      {/* Use the new EditJobModal component */}
      <EditJobModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onUpdate={handleUpdate}
        job={job}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  companyLocation: {
    fontSize: 14,
    color: Colors.light.icon,
    marginTop: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 20,
  },
  tag: {
    backgroundColor: Colors.light.tagBackground,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
    color: Colors.light.tagText,
    fontWeight: '500',
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  postedText: {
    fontSize: 13,
    color: Colors.light.icon,
  },
  salaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalOptionText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#1E1E2D',
  },
});
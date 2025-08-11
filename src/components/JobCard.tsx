// src/components/JobCard.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Colors } from '../constants/Colors';
import { Job, JobCardProps } from '../types/job';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';
import { ThemedText } from './ThemedText';

// Kita hanya perlu 'job' dan 'onDelete' seperti perbaikan sebelumnya
export const JobCard = ({ job, onDelete }: JobCardProps) => {
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const router = useRouter();

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
    router.push(`/edit-job?id=${job.id}`);
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {/* Bagian Info (Logo & Teks) */}
          <View style={styles.companyInfo}>
            <View style={[styles.logoContainer, { backgroundColor: job.logoBackgroundColor }]}>
              <FontAwesome name={job.logo as any} size={24} color={job.logoColor} />
            </View>
            <View style={styles.textContainer}>
              <ThemedText style={styles.jobTitle} numberOfLines={1} ellipsizeMode="tail">
                {job.title}
              </ThemedText>
              <ThemedText style={styles.companyLocation} numberOfLines={1} ellipsizeMode="tail">
                {job.company} &middot; {job.location}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity onPress={() => setOptionsModalVisible(true)} style={styles.ellipsisButton}>
            <FontAwesome name="ellipsis-v" size={20} color={Colors.light.icon} />
          </TouchableOpacity>
        </View>

        {/* Konten Kartu Lainnya */}
        <View style={styles.tagsContainer}>
          {job.tags?.map((tag, index) => (
            <View key={index} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
          ))}
        </View>
        <View style={styles.cardFooter}>
          <ThemedText style={styles.postedText}>{job.posted}</ThemedText>
          <ThemedText style={styles.salaryText}>{job.salary}</ThemedText>
        </View>
      </View>

      <Modal animationType="slide" transparent visible={optionsModalVisible} onRequestClose={() => setOptionsModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setOptionsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalOption} onPress={handleEditPress}>
                  <FontAwesome name="pencil" size={20} color={Colors.light.icon} />
                  <Text style={styles.modalOptionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={handleDeletePress}>
                  <FontAwesome name="trash" size={20} color={Colors.light.deleteButton} />
                  <Text style={[styles.modalOptionText, { color: Colors.light.deleteButton }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <ConfirmDeleteModal 
        visible={confirmDeleteVisible} 
        onClose={() => setConfirmDeleteVisible(false)} 
        onConfirm={confirmDelete} 
        title="Hapus Pekerjaan" 
        message="Apakah Anda yakin ingin menghapus pekerjaan ini?" 
      />
    </>
  );
};

// --- STYLES DENGAN PERBAIKAN TATA LETAK ---
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
      elevation: 3 
    },
    cardHeader: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      gap: 8, // Menambah jarak antar elemen header
    },
    companyInfo: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      gap: 16,
      flex: 1, // Penting: Membuat bagian ini mengisi ruang yang tersedia
    },
    logoContainer: { 
      width: 48, 
      height: 48, 
      borderRadius: 12, 
      justifyContent: 'center', 
      alignItems: 'center', 
      borderWidth: 1, 
      borderColor: '#F0F0F0' 
    },
    textContainer: {
      flex: 1, // Penting: Membuat container teks fleksibel
    },
    jobTitle: { 
      fontSize: 16, 
      fontWeight: '600' 
    },
    companyLocation: { 
      fontSize: 14, 
      color: Colors.light.icon, 
      marginTop: 4 
    },
    ellipsisButton: {
      paddingLeft: 10, // Memberi area sentuh yang lebih baik
    },
    tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 20 },
    tag: { backgroundColor: Colors.light.tagBackground, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 12 },
    tagText: { color: Colors.light.tagText, fontWeight: '500', fontSize: 12 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
    postedText: { fontSize: 13, color: Colors.light.icon },
    salaryText: { fontSize: 16, fontWeight: 'bold' },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: 40 },
    modalOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
    modalOptionText: { marginLeft: 15, fontSize: 16, color: '#1E1E2D' },
});
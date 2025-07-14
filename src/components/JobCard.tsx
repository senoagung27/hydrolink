import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '../constants/Colors';
import { jobs } from '../constants/mockJobs'; // Import mock job data

export type JobCardProps = {
  job: typeof jobs[0];
};

export const JobCard = ({ job }: JobCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={styles.companyInfo}>
        <View style={[styles.logoContainer, { backgroundColor: job.logoBackgroundColor }]}>
          <FontAwesome name={job.logo as any} size={24} color={job.logoColor} />
        </View>
        <View>
          <ThemedText style={styles.jobTitle}>{job.title}</ThemedText>
          <ThemedText style={styles.companyLocation}>
            {job.company} . {job.location}
          </ThemedText>
        </View>
      </View>
      <TouchableOpacity>
        <FontAwesome name="ellipsis-v" size={20} color={Colors.light.icon} />
      </TouchableOpacity>
    </View>
    <View style={styles.tagsContainer}>
      {job.tags.map((tag) => (
        <View key={tag} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
    <View style={styles.cardFooter}>
      <ThemedText style={styles.postedText}>{job.posted}</ThemedText>
      <ThemedText style={styles.salaryText}>{job.salary}</ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
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
      gap: 12,
    },
    logoContainer: {
      width: 50,
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    jobTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    companyLocation: {
      fontSize: 14,
      color: Colors.light.icon,
    },
    tagsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 16,
    },
    tag: {
      backgroundColor: '#F0F0F0',
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    tagText: {
      color: '#687076',
      fontWeight: '500',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    postedText: {
      fontSize: 14,
      color: Colors.light.icon,
    },
    salaryText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
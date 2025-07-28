import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router'; // Stack has been removed
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '../../../components/ThemedText';
import { Colors } from '../../../constants/Colors';
import { jobs } from '../../../constants/mockJobs';

// BulletPoint component remains the same...
const BulletPoint = ({ text }: { text: string }) => (
  <View style={styles.bulletPointContainer}>
    <Text style={styles.bullet}>•</Text>
    <ThemedText style={styles.bulletText}>{text}</ThemedText>
  </View>
);


export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Job not found!</ThemedText>
      </View>
    );
  }

  // Dummy data remains the same...
  const requirements = [
    'Sed ut perspiciatis unde omnis iste natus error sit.',
    'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur & adipisci velit.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
  ];

  const facilities = [
    'Medical',
    'Dental',
    'Technical Certification',
    'Meal Allowance',
    'Transport Allowance',
    'Regular Hours',
    'Mondays-Fridays',
  ];


  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: job.logoBackgroundColor }]}>
            <FontAwesome name={job.logo as any} size={40} color={job.logoColor} />
          </View>
          <ThemedText type="title" style={styles.jobTitleText}>{job.title}</ThemedText>
          <ThemedText style={styles.companyLocation}>
            {job.company} • {job.location} • 1 day ago
          </ThemedText>
        </View>

        {/* --- Sections (remain the same) --- */}
        <View style={styles.section}>
          <ThemedText type="subtitle">Job Description</ThemedText>
          <Text style={styles.description}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem ...
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Requirements</ThemedText>
          {requirements.map((item, index) => (
            <BulletPoint key={index} text={item} />
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Location</ThemedText>
          <ThemedText style={styles.locationText}>Overlook Avenue, Belleville, NJ, USA</ThemedText>
          <View style={styles.mapPlaceholder}>
             <Text style={styles.mapText}>Map Placeholder</Text>
          </View>
        </View>
        
        <View style={styles.section}>
            <ThemedText type="subtitle">Informations</ThemedText>
            <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Position</ThemedText>
                <ThemedText style={styles.infoValue}>Senior Designer</ThemedText>
            </View>
            <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Qualification</ThemedText>
                <ThemedText style={styles.infoValue}>Bachelors Degree</ThemedText>
            </View>
            <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Experience</ThemedText>
                <ThemedText style={styles.infoValue}>3 Years</ThemedText>
            </View>
            <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Job Type</ThemedText>
                <ThemedText style={styles.infoValue}>Full-Time</ThemedText>
            </View>
            <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Specialization</ThemedText>
                <ThemedText style={styles.infoValue}>Design</ThemedText>
            </View>
        </View>
        
        <View style={styles.section}>
            <ThemedText type="subtitle">Facilities and Others</ThemedText>
            {facilities.map((item, index) => (
                <BulletPoint key={index} text={item} />
            ))}
        </View>
        
      </ScrollView>
       <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>APPLY NOW</Text>
        </TouchableOpacity>
       </View>
    </View>
  );
}

// Styles remain the same...
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  jobTitleText: {
    marginBottom: 8,
  },
  companyLocation: {
    color: Colors.light.icon,
  },
  section: {
    marginBottom: 24,
  },
  description: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.icon,
  },
  readMore: {
    color: '#1DA1F2',
    fontWeight: 'bold',
    marginTop: 4,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  bullet: {
    fontSize: 16,
    marginRight: 8,
    color: Colors.light.icon,
  },
  bulletText: {
      flex: 1,
      color: Colors.light.icon,
      fontSize: 15,
  },
  locationText: {
    marginTop: 8,
    fontSize: 15,
    color: Colors.light.icon,
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapText: {
    color: '#687076'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoLabel: {
    color: Colors.light.icon,
    fontSize: 15,
  },
  infoValue: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F8F9FA',
  },
  applyButton: {
    backgroundColor: '#1E1E2D',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
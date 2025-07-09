import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme'; // Import useColorScheme

const jobs = [
  {
    id: '1',
    logo: 'google',
    title: 'UI/UX Designer',
    company: 'Google inc',
    location: 'California, USA',
    tags: ['Design', 'Full time', 'Senior designer'],
    posted: '25 minute ago',
    salary: '$15K/Mo',
    logoBackgroundColor: '#FFFFFF', // Latar belakang putih untuk Google
    logoColor: '#4285F4', // Warna ikon akan ditangani oleh FontAwesome untuk Google
  },
  {
    id: '2',
    logo: 'dribbble',
    title: 'Lead Designer',
    company: 'Dribbble inc',
    location: 'California, USA',
    tags: ['Design', 'Full time', 'Senior designer'],
    posted: '25 minute ago',
    salary: '$20K/Mo',
    logoBackgroundColor: '#FCEEF5', // Latar belakang pink muda untuk Dribbble
    logoColor: '#EA4C89', // Warna pink Dribbble
  },
  {
    id: '3',
    logo: 'twitter',
    title: 'UX Researcher',
    company: 'Twitter inc',
    location: 'California, USA',
    tags: ['Design', 'Full time', 'Senior designer'],
    posted: '25 minute ago',
    salary: '$12K/Mo',
    logoBackgroundColor: '#E7F5FE', // Latar belakang biru muda untuk Twitter
    logoColor: '#1DA1F2', // Warna biru Twitter
  },
];

type JobCardProps = {
  job: typeof jobs[0];
};

const JobCard = ({ job }: JobCardProps) => {
  const colorScheme = useColorScheme(); // Get current color scheme for JobCard styles
  const isDarkMode = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? Colors.dark.cardBackground : Colors.light.cardBackground },
      ]}>
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
          <FontAwesome
            name="ellipsis-v"
            size={20}
            color={Colors[colorScheme ?? 'light'].icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tagsContainer}>
        {job.tags.map((tag) => (
          <View
            key={tag}
            style={[
              styles.tag,
              { backgroundColor: isDarkMode ? Colors.dark.tagBackground : Colors.light.tagBackground },
            ]}>
            <Text
              style={[
                styles.tagText,
                { color: isDarkMode ? Colors.dark.tagText : Colors.light.tagText },
              ]}>
              {tag}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.cardFooter}>
        <ThemedText style={styles.postedText}>{job.posted}</ThemedText>
        <ThemedText style={styles.salaryText}>{job.salary}</ThemedText>
      </View>
    </View>
  );
};

export default function SavedJobsScreen() {
  const colorScheme = useColorScheme(); // Get current color scheme
  const isDarkMode = colorScheme === 'dark';

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.screenBackground },
      ]}>
      <View style={styles.header}>
        <ThemedText type="title">Save Job</ThemedText>
        <TouchableOpacity>
          <Text
            style={[
              styles.deleteAllText,
              { color: isDarkMode ? Colors.dark.deleteButton : Colors.light.deleteButton },
            ]}>
            Delete all
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

// 5. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Padding atas untuk header
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteAllText: {
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
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
    color: Colors.light.icon, // This will still use the 'icon' color from the current theme
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
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
    color: Colors.light.icon, // This will still use the 'icon' color from the current theme
  },
  salaryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
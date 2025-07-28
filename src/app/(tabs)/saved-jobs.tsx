import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { JobCard } from '../../components/JobCard';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { jobs } from '../../constants/mockJobs'; // Import job data

export default function SavedJobsScreen() {
  const router = useRouter(); // Initialize the router for navigation

  // Function to handle when a job card is pressed
  const handleNavigateToDetail = (jobId: string) => {
    // Navigate to the detail screen, passing the job ID in the URL
    router.push(`/job-detail/job-detail/${jobId}`);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Save Job</ThemedText>
        <TouchableOpacity>
          <Text style={styles.deleteAllText}>Delete all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          // Wrap the JobCard in a TouchableOpacity to make it pressable
          <TouchableOpacity onPress={() => handleNavigateToDetail(item.id)}>
            <JobCard job={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteAllText: {
    color: '#FF6347',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
});